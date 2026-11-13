// Playground data: demo scenes and webhooks, saved state (localStorage) and number/date helpers.
import { twoDigits } from "../../utils/format.ts";

export type SceneKind = keyof typeof THUMBS;
export type SceneOption = "comments" | "branding" | "expires";
export interface Scene {
  id: string;
  title: string;
  source: string;
  kind: SceneKind;
  views: number;
  sessions: number;
  watch: number;
  date: string;
  privacy: "private" | "public";
  opts: Record<SceneOption, boolean>;
  readyAt: number;
  notified?: boolean;
  tour?: string;
  rev?: number;
}
export interface Hook {
  id: string;
  name: string;
  url: string;
  status: "active" | "paused" | "failing";
  events: string[];
}
export interface ApiKey {
  id: string;
  name: string;
  secret: string;
  shown: boolean;
}
/** A webhook delivery: event, when, result. */
export type Delivery = [event: string, when: string, result: string];
/** What the Playground keeps in this browser (localStorage). */
export interface PlaygroundState {
  scenes: Scene[];
  hooks: Hook[];
  keys: ApiKey[];
  deliveries: Record<string, Delivery[]>;
  next: number;
}
export type Orientation = "h" | "v";
/** A door or window on a wall: x, y and orientation. */
export type Opening = [x: number, y: number, orientation: Orientation];
export type WallState = "solid" | "gap" | "off";
export type PlanTool = "select" | "door" | "win" | "gap";
export interface Plan {
  rot: number;
  fx: number;
  fy: number;
  tool: PlanTool;
  walls: WallState[];
  doors: Opening[];
  wins: Opening[];
  checks: boolean[];
}
/** The scene being created (New scene: upload, review, share). */
export interface Draft {
  type: "3d" | "plan";
  file: { name: string; size: number } | null;
  name: string;
  sample: boolean;
  plan: Plan | null;
  quality: string;
  tmp?: Scene | null;
}
export type SearchScope = "scenes" | "analytics" | "webhooks" | "plugins";
/** The Playground's data and what its views are showing. */
export interface Store {
  state: PlaygroundState;
  draft: Draft;
  qs: Record<SearchScope, string>;
  filter: "all" | "ready" | "processing";
  anRange: number;
  anId: string | null | undefined;
  whSel: string;
}

export const KEY = "verse-playground-v1";
export const SESSION = "verse-playground-session";

export const THUMBS = {
  room: "/assets/real-estate.webp",
  sofa: "/assets/sofa-environment.webp",
  building: "/assets/interior.webp",
  scan: "/assets/industrial-environment.webp",
  shoe: "/assets/product.webp",
  villa: "/assets/coastal-world.webp",
};
export const FORMATS = [
  ["GLB"],
  ["glTF embedded"],
  ["PLY splat"],
  ["SPLAT"],
  ["PLY point cloud"],
  ["LAS"],
  ["LAZ"],
  ["E57"],
  ["XYZ"],
  ["PLY scan mesh"],
  ["IFC"],
  ["USDZ"],
  ["USD"],
  ["FBX", 1],
  ["OBJ", 1],
  ["ZIP", 1],
  ["PNG"],
  ["JPG"],
  ["PDF"],
];
export const HEAVY = /\.(e57|las|laz|ifc|xyz|ply|splat)$/i;
export const EVENTS = ["scene.ready", "scene.viewed", "scene.failed"];
export const PLUGINS: [string, string, number, string, string][] = [
  ["Blender", "Publish a scene in one click, straight from the sidebar.", 45, "/plugins/blender", "/docs/blender"],
  ["Unity", "Ship Unity scenes to the web without a WebGL build.", 101, "/plugins/unity", "/docs/unity"],
  ["Unreal Engine", "Cinematic Unreal levels that open on any phone.", 70, "/plugins/unreal", "/docs/unreal"],
];

export const fmt = (n: number) => Number(n).toLocaleString("en-US");
export const now = () => Date.now();

export function seeded(seed: string) {
  let s = [...String(seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
export function series(seed: string, total: number, n = 90) {
  const r = seeded(seed),
    raw = Array.from({ length: n }, (_, i) => 0.35 + r() + (i / n) * 0.6);
  const last30 = raw.slice(-30).reduce((a, b) => a + b, 0) || 1;
  return raw.map((v) => Math.round((v * total) / last30));
}
export function dayLabel(i: number, n: number) {
  const d = new Date(Date.UTC(2026, 9, 30) - (n - 1 - i) * 864e5);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" });
}

const seedScenes = () => {
  const scenes: [string, string, string, SceneKind, number, number, string, string?][] = [
    ["sc-1038", "Prestige Lakeview 3BHK", "Instant Home", "villa", 1284, 902, "2026-10-18"],
    ["sc-1039", "Aurora sofa configurator", "Blender", "sofa", 3410, 2205, "2026-10-15"],
    ["sc-1040", "Indiranagar showroom tour", "Unreal", "building", 876, 540, "2026-10-12"],
    ["sc-1041", "HSR office scan", "Upload · E57", "scan", 0, 0, "2026-10-21", "processing"],
    ["sc-1042", "Runner X sneaker drop", "Unity", "shoe", 5120, 3988, "2026-10-06"],
    ["sc-1037", "Whitefield villa 12", "Instant Home", "room", 642, 410, "2026-10-02"],
  ];
  return scenes.map(
    ([id, title, source, kind, views, sessions, date, st]): Scene => ({
      id,
      title,
      source,
      kind,
      views,
      sessions,
      date,
      privacy: "private",
      opts: { comments: true, branding: true, expires: false },
      readyAt: st ? now() + 15000 : 0,
      watch: views * 102,
    }),
  );
};
const seedHooks = (): Hook[] => [
  { id: "wh1", name: "CRM sync", url: "https://api.lakeview-homes.in/verse/crm", status: "active", events: ["scene.ready", "scene.viewed"] },
  { id: "wh2", name: "Slack alerts", url: "https://hooks.slack.example/verse", status: "active", events: ["scene.ready", "scene.failed"] },
  { id: "wh3", name: "BI export", url: "https://bi.example.com/ingest/verse", status: "paused", events: ["scene.viewed"] },
  { id: "wh4", name: "Staging test", url: "https://staging.example.com/hook", status: "failing", events: ["scene.ready"] },
];

/** The saved Playground (or the demo data). */
export function loadState(): PlaygroundState {
  let state: PlaygroundState | null;
  try {
    state = JSON.parse(localStorage.getItem(KEY) ?? "null") as PlaygroundState | null;
  } catch {
    state = null;
  }
  if (!state || !state.scenes) state = { scenes: seedScenes(), hooks: seedHooks(), keys: [], deliveries: {}, next: 1043 };
  return state;
}
export function saveState(state: PlaygroundState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable: playground still works for this visit */
  }
}

export const emptyDraft = (): Draft => ({ type: "3d", file: null, name: "", sample: false, plan: null, quality: "balanced" });

export const status = (s: Scene) => (s.readyAt > now() ? "processing" : "ready");
export const sceneUrl = (id: string) => `${location.origin}/studio/scene/${id}`;
export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
export const hms = (sec: number) => `${Math.floor(sec / 3600)}h ${twoDigits(Math.floor((sec % 3600) / 60))}m`;
export const bytes = (n: number) =>
  n > 1e9 ? (n / 1e9).toFixed(1) + " GB" : n > 1e6 ? (n / 1e6).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1e3)) + " KB";

/* ---------- floor plan ---------- */
export const WALLS0: [number, number, number, number][] = [
  [40, 40, 220, 40],
  [220, 40, 380, 40],
  [380, 40, 380, 160],
  [380, 160, 380, 280],
  [380, 280, 310, 280],
  [310, 280, 220, 280],
  [220, 280, 40, 280],
  [40, 280, 40, 160],
  [40, 160, 40, 40],
  [220, 40, 220, 160],
  [40, 160, 220, 160],
  [220, 160, 380, 160],
  [220, 160, 220, 280],
  [310, 160, 310, 280],
];
export const ROOMS: [string, number, number, number, number][] = [
  ["Kitchen", 40, 40, 180, 120],
  ["Living / Dining", 220, 40, 160, 120],
  ["Bedroom 1", 40, 160, 180, 120],
  ["Bedroom 2", 220, 160, 90, 120],
  ["Bath", 310, 160, 70, 120],
];
export const FOCUS: [number, number][] = [
  [380, 100],
  [265, 280],
  [220, 100],
];
export const CONFIRMS = [
  "Is there a door between Living / Dining and the balcony?",
  "Is the blue mark on Bedroom 2 a window?",
  "Is the gap between Kitchen and Living an open archway?",
];
export function freshPlan(): Plan {
  return {
    rot: 0,
    fx: 1,
    fy: 1,
    tool: "select",
    walls: WALLS0.map(() => "solid"),
    doors: [
      [130, 160, "h"],
      [220, 220, "v"],
      [265, 160, "h"],
      [310, 220, "v"],
      [300, 40, "h"],
      [380, 100, "v"],
    ],
    wins: [
      [130, 40, "h"],
      [40, 100, "v"],
      [40, 220, "v"],
      [130, 280, "h"],
      [265, 280, "h"],
      [380, 220, "v"],
      [345, 280, "h"],
    ],
    checks: [false, false, false],
  };
}
export function nearestOnWall(w: [number, number, number, number], pt: { x: number; y: number }): Opening {
  const [x1, y1, x2, y2] = w,
    dx = x2 - x1,
    dy = y2 - y1,
    t = Math.max(0.15, Math.min(0.85, ((pt.x - x1) * dx + (pt.y - y1) * dy) / (dx * dx + dy * dy)));
  return [Math.round(x1 + t * dx), Math.round(y1 + t * dy), dx === 0 ? "v" : "h"];
}
