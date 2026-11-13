// Types of the Resources pages' data (data.ts), rendered by ResourcePage.tsx.
import type { CLAIMS, ROUTES } from "./data.ts";

export type ClaimId = keyof typeof CLAIMS;
export type RouteKey = keyof typeof ROUTES;
export interface Claim {
  tag: string;
  owner: string;
  question: string;
  confirmed: boolean;
}
export interface Route {
  path: string;
  status: "page" | "live" | "planned";
  fallback?: string;
}

/** Content shown only once its claim is confirmed (no claim: always shown). */
export interface Claimed {
  claim?: ClaimId;
}

// Rich text: a string, or a list of strings and parts (the helpers in utils.ts).
export interface LinkPart {
  link: string;
  href: string;
  [attribute: string]: string;
}
export interface ClaimPart {
  claim: ClaimId;
  parts: Rich;
  fallback?: Rich;
}
export type RichPart = string | LinkPart | ClaimPart | { strong: string } | { code: string } | { muted: string } | { pill: string; tone?: string };
export type Rich = RichPart | RichPart[];

export interface Action {
  label: string;
  href: string;
  event: string;
  outline?: boolean;
}
export interface Crumb {
  name: string;
  href: string;
}
export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  eager?: boolean;
}
export interface LiveDemoProps {
  src: string;
  title: string;
  poster: string;
  posterAlt: string;
  openLabel: string;
  embedClaim?: ClaimId;
  note: string;
  buttonId: string;
}
export interface TableProps {
  head: string[];
  rows: (Rich[] | ({ cells: Rich[] } & Claimed))[];
  caption?: string;
}

/** A piece of a section's content, by `type` (see BLOCKS in ResourcePage.tsx). */
export type Block = Claimed &
  (
    | { type: "p"; text: Rich; className?: string }
    | { type: "h3"; text: string }
    | { type: "list"; items: (Rich | ({ text: Rich } & Claimed))[]; ticks?: boolean }
    | { type: "answer"; q: string; a: Rich }
    | { type: "cards"; items: ({ title: string; body: Rich; kicker?: string } & Claimed)[]; cols?: number }
    | { type: "card"; title: string; text: string }
    | { type: "steps"; items: { title: string; body: Rich }[] }
    | { type: "callout"; title: string; blocks: Block[] }
    | { type: "cols"; cols: Block[] }
    | { type: "group"; blocks: Block[] }
    | { type: "fragment"; blocks: Block[] }
    | { type: "code"; text: string; label: string }
    | ({ type: "figure" } & FigureProps)
    | ({ type: "table" } & TableProps)
    | ({ type: "demo" } & LiveDemoProps)
    | { type: "video"; src: string; smallSrc: string; poster: string; label: string }
    | { type: "flow"; label: string; stages: { n: string; name: string; owner: string; items: string[]; verse?: boolean }[] }
    | { type: "details"; summary: string; items: Rich[]; className?: string }
    | { type: "noscript"; text: Rich }
  );
export type BlockType = Block["type"];

interface HeroBase {
  eyebrow: string;
  title: string;
  sub: Rich;
  actions: Action[];
  points?: string[];
}
export type Hero =
  | (HeroBase & { variant: "image"; image: { src: string; width: string; height: string } })
  | (HeroBase & { variant: "center" })
  | (HeroBase & { variant?: undefined; figure: FigureProps });

export interface Section extends Claimed {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  tone?: "alt";
  narrow?: boolean;
  blocks: Block[];
}
export interface Faq extends Claimed {
  q: string;
  a: string;
}
export interface ResourcePageData {
  crumbs: Crumb[];
  hero: Hero;
  sections: Section[];
  faq: Faq[];
  cta: { title: string; body: string; actions: Action[] };
}
