import { createServer, defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import pkg from "./package.json" with { type: "json" };
import { META, OG_DEFAULT, docsJsonLd } from "./src/pages/meta.ts";
import { withTrailingSlash } from "./src/pages/url.ts";
import type { DocsArticle, PageMeta } from "./src/pages/meta.ts";

/** A page's meta (src/pages/meta.ts) or its documentation payload (public/content/*.json). */
type Page = PageMeta & { article?: DocsArticle };

// The site's address, from package.json config.siteUrl (%SITE_URL% in index.html).
const siteUrl = pkg.config.siteUrl.replace(/\/+$/, "");
const siteUrlInHtml: Plugin = { name: "site-url", transformIndexHtml: (html: string) => html.replaceAll("%SITE_URL%", siteUrl) };

// Link previews don't run JavaScript, so after the build each page gets its own dist/<page>/index.html with its
// title, description, robots, canonical, OG and Twitter tags; prerendered pages also get their content,
// stylesheets and structured data.
const esc = (s: unknown) => String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
function setTag(html: string, attr: string, key: string, value: string) {
  const tag = new RegExp(`<meta\\b[^>]*\\b${attr}="${key}"[^>]*>`);
  const content = `content="${esc(value)}"`;
  if (tag.test(html))
    return html.replace(tag, (t) =>
      /\bcontent="[^"]*"/.test(t) ? t.replace(/\bcontent="[^"]*"/, () => content) : t.replace(/\s*\/?>$/, () => ` ${content}>`),
    );
  return html.replace("</head>", () => `<meta ${attr}="${key}" ${content}>\n</head>`);
}
const pageSocialTags: Plugin = {
  name: "page-social-tags",
  apply: "build" as const,
  async writeBundle({ dir }) {
    const out = dir!; // dist/
    const shell = fs.readFileSync(path.join(out, "index.html"), "utf8");
    const ssr = await loadPrerender();
    try {
      for (const { path: route } of JSON.parse(fs.readFileSync("public/content/manifest.json", "utf8")) as { path: string }[]) {
        const page: Page = META[route] ?? (JSON.parse(fs.readFileSync(`public/content/${route.slice(1).replaceAll("/", "__")}.json`, "utf8")) as Page);
        let html = shell;
        for (const [attr, key, value] of [
          ["property", "og:title", page.ogTitle || page.title],
          ["property", "og:description", page.ogDescription || page.description],
          ["property", "og:url", siteUrl + withTrailingSlash(route)],
          ["property", "og:site_name", "Verse Engine by Ctruh"],
          ["property", "og:image", siteUrl + (page.ogImage || OG_DEFAULT.ogImage)],
          ["property", "og:image:alt", page.ogImage ? "" : OG_DEFAULT.ogImageAlt], // the default description fits only the default image
          ["name", "twitter:card", "summary_large_image"],
          ["name", "twitter:title", page.ogTitle || page.title], // Twitter / X cards, as the SEO blueprint's own build (Part F)
          ["name", "twitter:description", page.ogDescription || page.description],
          ["name", "twitter:image", siteUrl + (page.ogImage || OG_DEFAULT.ogImage)],
        ] as [string, string, string][])
          html = setTag(html, attr, key, value);
        if (route !== "/") html = html.replace(/<script id="script-jsonld"[\s\S]*?<\/script>\n?/, ""); // home page only
        const jsonld = route.startsWith("/docs/") ? docsJsonLd(route, page, siteUrl) : page.prerender ? page.jsonld : null;
        if (jsonld)
          html = html.replace(
            "</head>",
            () => `<script id="script-jsonld" type="application/ld+json">${JSON.stringify(jsonld).replaceAll("<", "\\u003c")}</script>\n</head>`,
          );
        if (page.prerender) html = prerendered(html, page, await ssr!.prerender(route));
        html = setHead(html, route, [
          [TITLE, page.title],
          [DESCRIPTION, page.description],
          [ROBOTS, page.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"],
          [CANONICAL, siteUrl + withTrailingSlash(route)],
        ]);
        fs.mkdirSync(path.join(out, route), { recursive: true });
        fs.writeFileSync(path.join(out, route, "index.html"), html);
      }
    } finally {
      await ssr?.close();
    }
  },
};

// A prerendered page: "prerendered" on <html> (shown at once, no intro), its stylesheets and preloads in <head>,
// its content in <body> (the no-JavaScript notice is hidden). React takes this markup over (main.tsx).
function prerendered(html: string, page: Page, { body, styles }: { body: string; styles: string[] }) {
  const preloads = body.match(/^(?:<link [^>]*\/>)*/)![0];
  const links = styles.map((href) => `<link rel="stylesheet" href="${href}" data-route-style id="css-${path.basename(href, ".css")}">`).join("\n");
  const noJs = "<noscript><style>body>noscript{display:none}</style></noscript>";
  return (
    html
      .replace("<html ", '<html class="prerendered" ')
      .replace("</head>", () => `${links}\n${preloads}${noJs}\n</head>`)
      // the class the router sets; nothing after </body>: the browser would add that whitespace to <body>, which React does not expect
      .replace(/<body id="app-body">[\s\S]*$/, () => `<body id="app-body" class="${esc(page.bodyClass)}">${body.slice(preloads.length)}</body></html>`)
  );
}

// Loads src/prerender.tsx through Vite only when a page needs it; the server stays open until close().
async function loadPrerender() {
  if (!Object.values(META).some((m) => m.prerender)) return null;
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    plugins: [react()],
    logLevel: "error",
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    optimizeDeps: { noDiscovery: true },
  });
  const module = (await server.ssrLoadModule("/src/prerender.tsx")) as typeof import("./src/prerender.tsx");
  return { prerender: module.prerender, close: () => server.close() };
}

// The <head> tags the router sets in the browser; setHead writes them into a page's HTML.
const TITLE = /(<title id="doc-title">)[^<]*(<\/title>)/;
const DESCRIPTION = /(<meta id="meta-description" name="description" content=")[^"]*(")/;
const ROBOTS = /(<meta id="meta-robots" name="robots" content=")[^"]*(")/;
const CANONICAL = /(<link id="link-canonical" rel="canonical" href=")[^"]*(")/;
function setHead(html: string, route: string, tags: [RegExp, string][]) {
  for (const [re, value] of tags) {
    if (!re.test(html)) throw new Error(`${route}: ${re} not found in index.html`);
    html = html.replace(re, (_: string, open: string, close: string) => open + esc(value) + close);
  }
  return html;
}

// Year-long caching: each image, font and video in /assets/ gets a content-hashed copy in /assets/_h/, and the HTML
// <head>, stylesheets, payloads and scripts point at it. The originals stay, so old links keep working; the React
// bundle and the prerendered bodies are left as they are.
const VERSIONED = /\.(webp|jpe?g|png|svg|woff2?|otf|mp4)$/;
const walk = (d: string): string[] =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const assetVersions: Plugin = {
  name: "asset-versions",
  apply: "build" as const,
  writeBundle: {
    sequential: true, // after page-social-tags has written every page's HTML
    handler({ dir }) {
      const out = dir!,
        assets = path.join(out, "assets"),
        copies = new Map<string, string>();
      for (const file of walk(assets).filter((f) => VERSIONED.test(f))) {
        const rel = path.relative(assets, file).split(path.sep).join("/");
        const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
        const copy = "_h/" + rel.replace(/(\.[^.]+)$/, `.${hash}$1`);
        fs.mkdirSync(path.dirname(path.join(assets, copy)), { recursive: true });
        fs.copyFileSync(file, path.join(assets, copy));
        copies.set(rel, copy);
      }
      const names = [...copies.keys()].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      const re = new RegExp(`/assets/(${names.join("|")})(?![\\w.-])`, "g");
      const swap = (text: string) => text.replace(re, (_: string, rel: string) => "/assets/" + copies.get(rel));
      for (const file of walk(out)) {
        if (file.startsWith(assets + path.sep) || file.includes(`${path.sep}_app${path.sep}`) || !/\.(html|css|json|js)$/.test(file)) continue;
        let text = fs.readFileSync(file, "utf8");
        if (file.endsWith(".html")) {
          const end = text.indexOf("</head>"); // head only, image preloads left as they are
          text = text.slice(0, end).replace(/<link\b[^>]*>|[^<]+|</g, (part) => (/\bas="image"/.test(part) ? part : swap(part))) + text.slice(end);
        } else text = swap(text);
        fs.writeFileSync(file, text);
      }
    },
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlInHtml, pageSocialTags, assetVersions],
  // public/ is served unchanged; index.html is the only app entry (source/templates/*.html are content-build templates).
  optimizeDeps: { entries: ["index.html"] },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "_app", // bundled React code; keeps /assets/ for site images and fonts
    target: "es2022", // top-level await, like the original module entry
  },
});
