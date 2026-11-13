// Dependency-free Markdown renderer for the docs articles: render() returns the HTML and the headings.

export interface Heading {
  level: number;
  text: string;
  slug: string;
}
export interface RenderedMarkdown {
  html: string;
  headings: Heading[];
}
export interface RenderOptions {
  /** Rewrites each link's href (e.g. a docs link to the page's URL). */
  resolveLink?: (href: string) => string;
}
/** One render's headings, used slugs and link rewriter. */
interface State {
  headings: Heading[];
  slugs: Set<string>;
  resolveLink?: (href: string) => string;
}
interface ListItem {
  content: string[];
  contentIndent: number;
}

const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
/** Escapes HTML, leaving entities that are already there. */
export const escapeHtml = (text: unknown) => String(text).replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)|[<>"']/g, (c) => ENTITIES[c]);

// Web and mail links as they are; any other scheme (javascript:, data:) becomes "#".
function safeUrl(url: string) {
  const u = String(url).trim();
  return /^(https?:|mailto:)/i.test(u) ? u : /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u) ? "#" : u;
}

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[`*_~]/g, "")
      .replace(/&[a-z]+;|&#x?[0-9a-f]+;/g, " ")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

// A heading's text without its Markdown.
function plainText(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|\s)[*_](.+?)[*_](?=\s|$)/g, "$1$2")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

// Inline Markdown: code, images, links, autolinks, bold, italic, strikethrough and line breaks.
function inline(text: string, state: State) {
  const codes: string[] = [];
  let html = text.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_match: string, _ticks: string, code: string) => {
    codes.push(`<code>${escapeHtml(code.replace(/^ (.*) $/, "$1"))}</code>`);
    return `\0${codes.length - 1}\0`;
  });
  html = escapeHtml(html);
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_match: string, alt: string, src: string, title: string | undefined) =>
      `<img src="${escapeHtml(safeUrl(src))}" alt="${alt}" loading="lazy"${title ? ` title="${title}"` : ""}>`,
  );
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_match: string, label: string, href: string, title: string | undefined) => {
    const url = safeUrl(state.resolveLink ? state.resolveLink(href) : href);
    const external = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHtml(url)}"${external}${title ? ` title="${title}"` : ""}>${label}</a>`;
  });
  html = html.replace(
    /&lt;(https?:\/\/[^\s&]+)&gt;/g,
    (_match: string, url: string) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  );
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_\n]+?)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^\w*\\])\*([^*]+?)\*(?![\w*])/g, "$1<em>$2</em>");
  html = html.replace(/(^|\s)_([^_\n]+?)_(?=[\s.,;:!?)]|$)/g, "$1<em>$2</em>");
  html = html.replace(/~~([^~\n]+?)~~/g, "<del>$1</del>");
  html = html.replace(/( {2,}|\\)\n/g, "<br>\n");
  return html.replace(/\u0000(\d+)\u0000/g, (_match: string, n: string) => codes[Number(n)]);
}

// An inline SVG diagram, or "" if it could run code or load anything.
function safeSvg(source: string) {
  const svg = String(source).trim();
  return !/^<svg[\s>]/i.test(svg) ||
    !/<\/svg>\s*$/i.test(svg) ||
    /<\s*(script|foreignObject|iframe|object|embed|use|image|a)\b/i.test(svg) ||
    /\son[a-z]+\s*=/i.test(svg) ||
    /(href|src|xlink:href)\s*=\s*["']?\s*(?!#)/i.test(svg) ||
    /javascript:|data:|expression\(|url\((?!\s*["']?#)/i.test(svg)
    ? ""
    : svg;
}

const FENCE = /^ {0,3}(`{3,}|~{3,})\s*([\w+-]*)\s*$/;
const HEADING = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/;
const LIST_ITEM = /^(\s*)([-*+]|\d{1,9}[.)])(\s+|$)(.*)$/;
const QUOTE = /^ {0,3}>\s?(.*)$/;
const TABLE_DIVIDER = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
const indentOf = (line: string) => /^\s*/.exec(line)![0].length;
const startsBlock = (line: string) => FENCE.test(line) || HEADING.test(line) || RULE.test(line) || QUOTE.test(line) || LIST_ITEM.test(line);

// A unique slug for a heading: "-2", "-3"... added to a repeated one.
function uniqueSlug(text: string, slugs: Set<string>) {
  let slug = slugify(text);
  if (slugs.has(slug)) {
    let n = 2;
    while (slugs.has(`${slug}-${n}`)) n++;
    slug = `${slug}-${n}`;
  }
  slugs.add(slug);
  return slug;
}

// Block Markdown: code fences (```svg diagrams inline), headings, rules, quotes, tables, lists and paragraphs.
function blocks(lines: string[], state: State): string {
  const out: string[] = [];
  let t = 0;
  while (t < lines.length) {
    const line = lines[t];
    if (line.trim() === "") {
      t++;
      continue;
    }
    let match: RegExpExecArray | null;
    if ((match = FENCE.exec(line))) {
      const fence = match[1],
        lang = match[2],
        code: string[] = [];
      t++;
      const close = new RegExp(`^ {0,3}${fence[0] === "`" ? "`" : "~"}{${fence.length},}\\s*$`);
      while (t < lines.length && !close.test(lines[t])) {
        code.push(lines[t]);
        t++;
      }
      t++;
      if (lang === "svg") {
        const svg = safeSvg(code.join("\n"));
        if (svg) {
          out.push(`<figure class="diagram">${svg}</figure>`);
          continue;
        }
      }
      out.push(
        `<div class="code"${lang ? ` data-lang="${escapeHtml(lang)}"` : ""}><button type="button" class="copy" aria-label="Copy code">Copy</button><pre><code${lang ? ` class="lang-${escapeHtml(lang)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre></div>`,
      );
      continue;
    }
    if ((match = HEADING.exec(line))) {
      const level = match[1].length,
        text = plainText(match[2]),
        slug = uniqueSlug(text, state.slugs);
      state.headings.push({ level, text, slug });
      out.push(`<h${level} id="${slug}">${inline(match[2], state)}<a class="anchor" href="#${slug}" aria-label="Link to this section">#</a></h${level}>`);
      t++;
      continue;
    }
    if (RULE.test(line)) {
      out.push("<hr>");
      t++;
      continue;
    }
    if (QUOTE.test(line)) {
      const quoted: string[] = [];
      while (t < lines.length && (QUOTE.test(lines[t]) || (lines[t].trim() !== "" && quoted.length > 0 && !startsBlock(lines[t])))) {
        const q = QUOTE.exec(lines[t]);
        quoted.push(q ? q[1] : lines[t]);
        t++;
      }
      out.push(`<blockquote>${blocks(quoted, state)}</blockquote>`);
      continue;
    }
    if (line.includes("|") && t + 1 < lines.length && TABLE_DIVIDER.test(lines[t + 1]) && lines[t + 1].includes("|")) {
      const cells = (row: string) =>
        row
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split(/(?<!\\)\|/)
          .map((cell) => cell.trim().replace(/\\\|/g, "|"));
      const head = cells(line),
        align = cells(lines[t + 1]).map((d) => (/^:-+:$/.test(d) ? "center" : /^-+:$/.test(d) ? "right" : /^:-+$/.test(d) ? "left" : ""));
      t += 2;
      const rows: string[][] = [];
      while (t < lines.length && lines[t].trim() !== "" && lines[t].includes("|")) {
        rows.push(cells(lines[t]));
        t++;
      }
      const row = (tag: string, r: string[]) =>
        `<tr>${r.map((cell, i) => `<${tag}${align[i] ? ` style="text-align:${align[i]}"` : ""}>${inline(cell, state)}</${tag}>`).join("")}</tr>`;
      out.push(`<div class="table-wrap"><table><thead>${row("th", head)}</thead><tbody>${rows.map((r) => row("td", r)).join("")}</tbody></table></div>`);
      continue;
    }
    if ((match = LIST_ITEM.exec(line)) && (match[3] || match[4] === "")) {
      const indent = match[1].length,
        ordered = /\d/.test(match[2]),
        start = ordered ? parseInt(match[2], 10) : 1,
        items: ListItem[] = [];
      while (t < lines.length) {
        const current = lines[t],
          item = LIST_ITEM.exec(current);
        if (item && (item[3] || item[4] === "") && item[1].length <= indent) {
          if (item[1].length < indent || /\d/.test(item[2]) !== ordered) break;
          items.push({ content: [item[4]], contentIndent: item[1].length + item[2].length + Math.max(1, item[3].length) });
          t++;
          continue;
        }
        const last = items[items.length - 1];
        if (current.trim() === "") {
          const next = lines[t + 1];
          if (next === undefined) break;
          const nextItem = LIST_ITEM.exec(next);
          if ((nextItem && nextItem[1].length >= indent) || indentOf(next) >= indent + 2) {
            last.content.push("");
            t++;
            continue;
          }
          break;
        }
        const lineIndent = indentOf(current),
          afterBlank = last.content[last.content.length - 1] === "";
        if (lineIndent > indent || (!afterBlank && !startsBlock(current))) {
          last.content.push(lineIndent >= last.contentIndent ? current.slice(last.contentIndent) : current.trimStart());
          t++;
          continue;
        }
        break;
      }
      const tag = ordered ? "ol" : "ul",
        startAttribute = ordered && start !== 1 ? ` start="${start}"` : "";
      const listItems = items.map((item) => {
        let html = blocks(item.content, state);
        if ((html.match(/<p>/g) || []).length === 1) html = html.replace(/^<p>([\s\S]*?)<\/p>/, "$1");
        const task = /^\[([ xX])\]\s+/.exec(html);
        if (task) html = `<input type="checkbox" disabled${task[1] !== " " ? " checked" : ""}> ${html.slice(task[0].length)}`;
        return `<li>${html}</li>`;
      });
      out.push(`<${tag}${startAttribute}>${listItems.join("")}</${tag}>`);
      continue;
    }
    const paragraph = [line];
    for (
      t++;
      t < lines.length &&
      lines[t].trim() !== "" &&
      !startsBlock(lines[t]) &&
      !(lines[t].includes("|") && t + 1 < lines.length && TABLE_DIVIDER.test(lines[t + 1]));
      t++
    )
      paragraph.push(lines[t]);
    out.push(`<p>${inline(paragraph.join("\n"), state).trim()}</p>`);
  }
  return out.join("\n");
}

/** The article's HTML and its headings. */
export function render(markdown: string, options?: RenderOptions): RenderedMarkdown {
  const state: State = { headings: [], slugs: new Set(), resolveLink: options && options.resolveLink };
  const lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
  return { html: blocks(lines, state), headings: state.headings };
}

/** The article's headings only (code fences skipped). */
export function headings(markdown: string): Heading[] {
  const out: Heading[] = [],
    slugs = new Set<string>();
  let fence: string | null = null;
  for (const line of String(markdown).split(/\r?\n/)) {
    const open = FENCE.exec(line);
    if (open) {
      if (!fence) fence = open[1];
      else if (line.trim().startsWith(fence)) fence = null;
      continue;
    }
    if (fence) continue;
    const heading = HEADING.exec(line);
    if (!heading) continue;
    const text = plainText(heading[2]);
    out.push({ level: heading[1].length, text, slug: uniqueSlug(text, slugs) });
  }
  return out;
}
