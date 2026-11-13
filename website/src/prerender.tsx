// Build time only (vite.config.ts): the HTML of a page with `prerender: true`, the shell with the page inside as
// the app first shows it. React takes this markup over in the browser (main.tsx).
import { renderToString } from "react-dom/server";
import Shell from "./Shell.tsx";
import { META } from "./pages/meta.ts";
import { loadPage, shellView, stylesFor } from "./routes.ts";

/** The page's <body> markup and its stylesheets (as the app loads them). */
export async function prerender(path: string) {
  const payload = { path, ...META[path] };
  const Component = await loadPage(path);
  if (!Component) throw new Error(`No page to prerender for ${path}`);
  return { body: renderToString(<Shell view={shellView(payload, true, <Component />)} />), styles: stylesFor(path, payload.kind) };
}
