/** Canonical path for a page URL; file-like paths and the site root stay unchanged. */
export function withTrailingSlash(pathname: string): string {
  if (pathname === "/" || pathname.endsWith("/") || /\.[^/]+$/.test(pathname)) return pathname;
  return pathname + "/";
}
