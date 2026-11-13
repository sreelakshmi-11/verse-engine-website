// Helpers for the Resources pages, their data and structured data. data.ts and this file import each other, so
// the helpers are function declarations (ready whichever module loads first).
import { CLAIMS, SITE, ROUTES } from "./data.ts";
import type { ClaimId, ClaimPart, LinkPart, Rich, Route, RouteKey } from "./types.ts";

/** The link for a route key (planned pages fall back to a section of the home page). */
export function href(key: RouteKey): string {
  const r: Route = ROUTES[key];
  if (!r) throw new Error("Unknown route " + key);
  return r.status === "planned" && r.fallback ? r.fallback : r.path;
}
export function canonical(key: RouteKey): string {
  return SITE + ROUTES[key].path;
}

/** True when content tied to a claim may be shown (no claim, or a confirmed one). */
export function claimOk(id?: ClaimId): boolean {
  if (!id) return true;
  if (!CLAIMS[id]) throw new Error("Unknown claim " + id);
  return CLAIMS[id].confirmed === true;
}

// Rich text parts (rendered by <Rich> in ResourcePage.tsx).
export function link(label: string, to: string, attrs?: Record<string, string>): LinkPart {
  return { link: label, href: to, ...attrs };
}
export function strong(text: string) {
  return { strong: text };
}
export function code(text: string) {
  return { code: text };
}
export function muted(text: string) {
  return { muted: text };
}
export function pill(text: string, tone?: string) {
  return { pill: text, tone };
}
/** Text shown only once claim `id` is confirmed; until then `fallback` (if any). */
export function claim(id: ClaimId, parts: Rich, fallback?: Rich): ClaimPart {
  return { claim: id, parts, fallback };
}
