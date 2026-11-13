// Home page content, rendered by the sections in ./sections/. The landing scripts read the same lists: index.ts (realityModes),
// plugins.ts (plugins), sections.ts (lyonViews, createRoutes, techniques, benchMeasures).

export interface Link {
  href: string;
  label: string;
  id?: string;
}

/** Two-line heading: first line, then the accent line (wrapped in <span>). */
export interface SectionHeading {
  number: string;
  id: string;
  title: string;
  accent: string;
  text: string;
  /** Optional text link shown under the intro text. */
  link?: Link;
}

// ---------- Scroll story ----------

export const heroAside = ["Free to start.", "Viewers never pay."];

export interface RealityMode {
  mode: "web" | "ar" | "xr";
  label: string;
  /** Description shown while this mode is selected (index.ts). */
  copy: string;
  note: string;
  status: string;
}

export const realityModes: RealityMode[] = [
  {
    mode: "web",
    label: "Web 3D",
    copy: "A browser tab is all it takes. Orbit, zoom, and explore without an app or a plug-in.",
    note: "No installs. No downloads. Just a link.",
    status: "WEB 3D · BROWSER",
  },
  {
    mode: "ar",
    label: "AR",
    copy: "Place a scene in the world around you. Let your audience experience a product in their own space.",
    note: "Augmented reality on compatible devices.",
    status: "AR · PHONE",
  },
  {
    mode: "xr",
    label: "XR",
    copy: "Step inside the scene. Turn a shared link into a sense of presence on a supported XR headset.",
    note: "Extended reality on compatible headsets.",
    status: "XR · HEADSET",
  },
];

/** Chapters 01–05 of the story (chapter 00 is the hero). Optional parts render only when present. */
export interface StoryChapter {
  chapter: number;
  className: string;
  label: string;
  /** Heading lines; the first keeps its trailing spaces, as in the build. */
  title: [string, string];
  body: [string, string];
  bodyId?: string;
  stat?: { value: string; label: string };
  note?: { text: string; link: Link; after: string };
  features?: string[];
  modes?: boolean;
  cta?: { button: Link; link: Link };
  callout?: { mark: string; text: string; small: string };
  meta?: { text: string; bits: string };
  workflow?: string[];
}

export const storyChapters: StoryChapter[] = [
  {
    chapter: 1,
    className: "detail-panel",
    label: "01 / The detail",
    title: ["Keep every last  ", "detail."],
    body: ["A product. A place. A real city.", "Your scene travels with all of it."],
    stat: { value: "10.3B", label: "unique triangles in one file" },
    note: {
      text: "Lyon, Chrome on a laptop. ",
      link: { href: "#benchmarks", id: "lnk-source", label: "Benchmarks" },
      after: "Results vary by scene and device.",
    },
    callout: { mark: "+", text: "Geometry, uncompromised.", small: "Mesh → browser" },
  },
  {
    chapter: 2,
    className: "stream-panel",
    label: "02 / The transformation",
    title: ["Heavy files. ", "Weightless delivery."],
    body: ["One 556 GB file stays on the server.", "Your screen gets only what it can see."],
    stat: { value: "0.05%", label: "of the file draws the whole city" },
    note: {
      text: "A detailed interior shows its first picture in 0.9 s. ",
      link: { href: "#lyon", id: "lnk-source-2", label: "See the city" },
      after: "Results vary by scene and connection.",
    },
    meta: { text: "Scene streaming ", bits: "010 / 110 / 001" },
  },
  {
    chapter: 3,
    className: "link-panel",
    label: "03 / The connection",
    title: ["A whole world. ", "In one link."],
    body: ["Send it on WhatsApp. Embed it. Make it private.", "Update the scene without changing the link."],
    features: ["Private", "Editable", "Embeddable"],
    workflow: ["Bring your scene", "We prepare it", "Share your world"],
  },
  {
    chapter: 4,
    className: "reality-panel",
    label: "04 / The experience",
    title: ["One scene. ", "Every reality."],
    body: ["A browser tab is all it takes. Orbit, zoom,", "and explore without an app or a plug-in."],
    bodyId: "reality-description",
    modes: true,
  },
  {
    chapter: 5,
    className: "resolve-panel",
    label: "05 / Your next dimension",
    title: ["The next world ", "starts with you."],
    body: ["Free to start. Viewers never pay.", "Live on 16 November 2026."],
    cta: {
      button: { href: "/studio", id: "lnk-explore-verse-engine-3", label: "Try it free" },
      link: { href: "#lyon", id: "lnk-explore-the-possibilities", label: "See the 10.3B-triangle city ↓" },
    },
  },
];

export const chapterNav = [
  { label: "Object", aria: "Chapter 0: Object", id: "btn-chapter-0-object" },
  { label: "Table", aria: "Chapter 1: Object and table", id: "btn-chapter-1-object-and-table" },
  { label: "Interior", aria: "Chapter 2: Furnished interior", id: "btn-chapter-2-furnished-interior" },
  { label: "Building", aria: "Chapter 3: Apartment building", id: "btn-chapter-3-apartment-building" },
  { label: "Township", aria: "Chapter 4: Neighbourhood", id: "btn-chapter-4-neighbourhood" },
  { label: "Explore", aria: "Chapter 5: Complete scene", id: "btn-chapter-5-complete-scene" },
];

// ---------- Lyon ----------

export const lyonHeading: SectionHeading = {
  number: "THE 10.3 BILLION TRIANGLE MOMENT",
  id: "lyon-heading",
  title: "A real city.",
  accent: "One file. One link.",
  text: "Lyon, France: 10.3 billion unique triangles of textured city in one 556 GB file, opened from a link in Chrome on a laptop and walkable at street level.",
  // Links this section to the Lyon demo page.
  link: { href: "/demos/lyon", label: "How it was measured", id: "lnk-how-it-was-measured" },
};

/** The three Lyon views: photo, tab label and the readout shown for it (sections.ts switches them). */
export const lyonViews = [
  {
    id: "tab-lyon-city-overview",
    src: "/media/city-hero.webp",
    alt: "Lyon from above, streamed by Verse Engine in Chrome",
    width: 2400,
    height: 1290,
    tab: "City overview",
    fig: "10.3",
    unit: "B",
    note: "unique triangles, from a single 556 GB file",
  },
  {
    id: "tab-lyon-fourviere",
    src: "/media/city-fourviere.webp",
    alt: "Fourvière, looking across Lyon",
    width: 1600,
    height: 900,
    tab: "Fourvière",
    fig: "0.05",
    unit: "%",
    note: "of the file is enough to draw the whole city",
  },
  {
    id: "tab-lyon-street-level",
    src: "/media/city-terreaux.webp",
    alt: "Place des Terreaux at street level",
    width: 1600,
    height: 900,
    tab: "Street level",
    fig: "8.5",
    unit: "s",
    note: "until street detail appears after arriving",
  },
];

export const lyonSquaresLegend = [
  { label: "2,000 squares", text: " = the 556 GB file", lit: false },
  { label: "1 lit square", text: " = the whole city on screen", lit: true },
];

export const lyonStops = [
  { label: "Browser engines", text: " hold the whole scene in memory: tens of millions of triangles at most." },
  { label: "City platforms", text: " stream millions of tiles from a tiling pipeline, not from your file." },
  { label: "Cloud streaming", text: " runs a GPU server per viewer, billed by the minute." },
  { label: "Native apps", text: " ask every viewer to install something first." },
];

// ---------- Proof ----------

export const proofHeading: SectionHeading = {
  number: "PROOF, NOT PROMISES",
  id: "proof-heading",
  title: "Measured.",
  accent: "Not rendered for a trailer.",
  text: "Every number on this page comes from the engine running in a browser. Hover or tap a number to see how it was measured.",
};

/** count/dec drive the count-up in sections.ts; prefix and suffix sit around the counted number. */
export const proofStats = [
  {
    id: "btn-proof-triangles",
    prefix: "",
    count: "10.3",
    dec: 1,
    suffix: "B",
    label: "unique triangles from one file",
    note: "Lyon: one 556 GB photomesh, opened from a link in Chrome on a laptop.",
  },
  {
    id: "btn-proof-first-picture",
    prefix: "",
    count: "0.9",
    dec: 1,
    suffix: " s",
    label: "to the first picture",
    note: "A detailed interior over the internet. It then sharpens wherever you look.",
  },
  {
    id: "btn-proof-first-pixel",
    prefix: "",
    count: "1",
    dec: 0,
    suffix: " MB",
    label: "before the first pixel",
    note: "Only the first view's worth of data arrives before anything is drawn.",
  },
  {
    id: "btn-proof-mobile-data",
    prefix: "",
    count: "29",
    dec: 0,
    suffix: " s",
    label: "to complete on mobile data",
    note: "A large interior on an everyday phone over a typical mobile connection.",
  },
  {
    id: "btn-proof-colour-gap",
    prefix: "ΔE ",
    count: "0.3",
    dec: 1,
    suffix: "",
    label: "colour gap, phone to desktop",
    note: "Below the difference the eye can see, so a product looks the same on every screen.",
  },
  {
    id: "btn-proof-stability",
    prefix: "",
    count: "24",
    dec: 0,
    suffix: " h",
    label: "at 120 fps, no crash",
    note: "A continuous stability run in a desktop browser.",
  },
  {
    id: "btn-proof-gpu-cost",
    prefix: "~$",
    count: "0",
    dec: 0,
    suffix: "",
    label: "server GPU per view",
    note: "The viewer's own device draws the scene. No GPU server sits behind each viewer.",
  },
  {
    id: "btn-proof-blender-to-link",
    prefix: "",
    count: "45",
    dec: 0,
    suffix: " s",
    label: "Blender project to link",
    note: "One Publish button. Unreal takes about 70 s and Unity about 101 s.",
  },
];

// ---------- Benchmarks ----------

export const benchHeading: SectionHeading = {
  number: "BENCHMARKS",
  id: "bench-heading",
  title: "Same city.",
  accent: "Same laptop.",
  text: "Verse Engine, CesiumJS and Google 3D Tiles on the city of Lyon. Measured, and including the row we did not win.",
};

/** Compared engines, in bar and table-column order; the first is Verse. */
export const benchEngines = ["Verse Engine", "CesiumJS", "Google 3D Tiles"];

export type BenchRow = [lo: number, hi: number, label: string] | null;

/** Tabs of the bar chart. rows follow benchEngines; null = not compared; win = index of the winning bar. */
export const benchMeasures: {
  id: string;
  tab: string;
  question: string;
  max: number;
  rows: BenchRow[];
  win: number;
  verdict: { strong: string; text: string };
}[] = [
  {
    id: "tab-bench-street-detail",
    tab: "Street detail",
    question: "Seconds until street detail appears after arriving. Lower is better.",
    max: 28,
    rows: [
      [8.5, 8.5, "8.5 s"],
      [11, 26, "11–26 s"],
      [13.7, 13.7, "13.7 s"],
    ],
    win: 0,
    verdict: { strong: "Verse is fastest to street detail", text: ", streaming straight from one 556 GB file." },
  },
  {
    id: "tab-bench-triangles",
    tab: "Triangles on screen",
    question: "Millions of triangles drawn for the city overview. Higher is better.",
    max: 6.5,
    rows: [[5.9, 5.9, "5.9 M"], [0.52, 0.52, "0.52 M"], null],
    win: 0,
    verdict: { strong: "About 11× the detail on screen", text: " for the same view of Lyon." },
  },
  {
    id: "tab-bench-frame-time",
    tab: "Frame time",
    question: "Frame time while walking, 95% of frames under. Lower is smoother.",
    max: 28,
    rows: [
      [14, 15, "14–15 ms"],
      [10, 20, "10–20 ms"],
      [24.9, 24.9, "24.9 ms"],
    ],
    win: 0,
    verdict: { strong: "Verse holds a tight 14–15 ms band", text: " while CesiumJS swings between 10 and 20 ms." },
  },
  {
    id: "tab-bench-first-picture",
    tab: "First picture",
    question: "Seconds to the first picture. Lower is better.",
    max: 13,
    rows: [
      [1.7, 1.7, "1.7 s"],
      [7.5, 11.6, "7.5–11.6 s"],
      [1.34, 1.34, "1.34 s"],
    ],
    win: 2,
    verdict: { strong: "Google leads on first picture, and we say so.", text: " Across our test laptops, Verse's first picture ranged 2–8 s." },
  },
];

/** Full table: cells follow benchEngines; win = index of a cell marked as the winner (other than Verse). */
export const benchTable: { measure: string; cells: string[]; win?: number }[] = [
  { measure: "Opens your own 10B-triangle file", cells: ["Yes, one file", "Only after a tiling pipeline", "No, Google's capture only"] },
  { measure: "Files to host for this city", cells: ["1", "6.1 million", "Hosted by Google"] },
  { measure: "Triangles on screen, city overview", cells: ["5.9 M", "0.52 M", "Not compared"] },
  { measure: "Street detail after arriving", cells: ["about 8.5 s", "11–26 s", "13.7 s"] },
  { measure: "Frame time while walking (95% under)", cells: ["14–15 ms", "10–20 ms", "24.9 ms"] },
  { measure: "First picture", cells: ["1.7 s best case", "7.5–11.6 s", "1.34 s"], win: 2 },
];

// ---------- Old way vs one link ----------

export const raceHeading: SectionHeading = {
  number: "THE OLD WAY VS ONE LINK",
  id: "race-heading",
  title: "Sharing 3D used to be a project.",
  accent: "Now it's a link.",
  text: "Every other route makes you give something up: detail, money, time, or the viewer who would not install an app.",
};

export const raceLanes = [
  {
    className: "old",
    title: "Today",
    statusAttr: "data-race-old-status",
    steps: [
      { label: "Cut the model down", cost: "lose detail" },
      { label: "Bake and compress", cost: "hours of rework" },
      { label: "Build a viewer or an app", cost: "a dev project" },
      { label: "Rent GPUs to stream it", cost: "billed per minute" },
      { label: "Ask viewers to install", cost: "most never do" },
    ],
  },
  {
    className: "new",
    title: "Verse Engine",
    statusAttr: "data-race-new-status",
    steps: [
      { label: "Upload the full file", cost: "every triangle kept" },
      { label: "Share one link", cost: "45 s from Blender" },
      { label: "Anyone opens it", cost: "any browser, no app" },
    ],
  },
];

/** Comparison matrix: columns before the Verse column; cells are [text, "y" | "n"], then the Verse cell. */
export const raceMatrix = {
  columns: ["Browser engines", "City platforms", "Cloud streaming", "Native apps"],
  verse: "Verse Engine",
  rows: [
    {
      label: "Opens in a browser, no install",
      cells: [
        ["Yes", "y"],
        ["Yes", "y"],
        ["Yes", "y"],
        ["No", "n"],
      ],
      verse: "Yes",
    },
    {
      label: "Billions of triangles",
      cells: [
        ["Tens of millions", "n"],
        ["Tiles only", "y"],
        ["Yes", "y"],
        ["Yes", "y"],
      ],
      verse: "10.3B, one file",
    },
    {
      label: "Streams your own file as is",
      cells: [
        ["Small files", "y"],
        ["Tiling pipeline first", "n"],
        ["Yes", "y"],
        ["Rebuild per app", "n"],
      ],
      verse: "Yes",
    },
    {
      label: "Cost per viewer",
      cells: [
        ["Low", "y"],
        ["Low", "y"],
        ["GPU per viewer", "n"],
        ["Low", "y"],
      ],
      verse: "~$0 GPU",
    },
  ],
};

// ---------- How to start ----------

export const workflowCards = [
  {
    id: "art-workflow-card",
    headerId: "hdr-item",
    n: "[01]",
    title: "DROP IT IN.",
    sub: "BRING WHAT YOU ALREADY HAVE",
    text: "A huge Blender scene. A laser scan of an office. A phone photo of a floor plan. Throw it at Verse Engine, or hit Publish without leaving Blender, Unity or Unreal. You sign in by approving it in your browser.",
    visual: "upload",
  },
  {
    id: "art-workflow-card-2",
    headerId: "hdr-item-2",
    n: "[02]",
    title: "WE COOK IT ONCE.",
    sub: "VERSE ENGINE PREPARES IT",
    text: "Like a film prepared for streaming, your scene is sliced for every kind of device and signed so viewers know it’s genuine. It happens one time, and if a step fails the upload recovers on its own.",
    visual: "prepare",
  },
  {
    id: "art-workflow-card-3",
    headerId: "hdr-item-3",
    n: "[03]",
    title: "SEND IT FLYING.",
    sub: "SHARE ONE LINK",
    text: "Paste it into WhatsApp, a pitch deck or your website. Viewers get only what they can see, so it opens fast on an everyday device. Lock it to private, collect comments, export a video, and see who opened it.",
    visual: "share",
  },
] as const;

export const shareBadges = ["✓ PRIVATE", "✓ EDITABLE", "✓ EMBEDDABLE"];

// ---------- Ways to create ----------

export const createHeading: SectionHeading = {
  number: "CREATE",
  id: "create-heading",
  title: "Four ways",
  accent: "to make a space.",
  text: "Start from a floor plan, a room, an idea or the tool you already use. Every route ends in the same place: one Verse link.",
};

/** Each route: list button, stage image and the caption sections.ts shows for it. */
export const createRoutes = [
  {
    badge: { className: "live", label: "Available" },
    id: "tab-create-ctruh-homes",
    title: "Ctruh Homes",
    text: "A floor plan becomes a walkable, furnished home in about a minute. Restyle it in a sentence.",
    image: { src: "/assets/sample-0.webp", alt: "A furnished apartment generated from a floor plan", width: 720, height: 450 },
    input: "floor-plan.pdf",
    output: "Walkable home · ~1 min",
    tag: "Real Verse sample",
  },
  {
    badge: { className: "live", label: "Available" },
    id: "tab-create-verse-plugins",
    title: "Verse plug-ins",
    text: "One Publish button in Blender, Unity and Unreal, or drop any of 20+ file types into the app.",
    image: { src: "/assets/industrial-environment.webp", alt: "A factory scene published from a design tool", width: 1942, height: 809 },
    input: "factory_line.blend",
    output: "One Publish button · 45 s",
    tag: "Concept visual",
  },
  {
    badge: { className: "beta", label: "Private beta" },
    id: "tab-create-ctruh-capture",
    title: "Ctruh Capture",
    text: "Walk around a room with a camera and get a walkable space back as a link.",
    image: { src: "/assets/sofa-environment.webp", alt: "A living room captured from a walk-through video", width: 1448, height: 1086 },
    input: "room-walkthrough.mov",
    output: "Walkable room · private beta",
    tag: "Concept visual",
  },
  {
    badge: { className: "soon", label: "Coming soon" },
    id: "tab-create-ctruh-worlds",
    title: "Ctruh Worlds",
    text: "Describe a place or share a photo and get a 3D world to explore, on our own open models.",
    image: { src: "/assets/coastal-world.webp", alt: "A coastal world generated from a sentence", width: 1536, height: 1024 },
    input: "“a terrace above the sea”",
    output: "Explorable world · coming soon",
    tag: "Concept visual",
  },
];

// ---------- Use cases (gallery) ----------

export const galleryCards = [
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/demo-showflat-v2.vpk",
    label: "Walk the apartment",
    id: "lnk-walk-the-apartment",
    image: "/assets/sample-0.webp",
    alt: "A furnished living room and dining area, rendered live in the browser",
    title: ["Verse for Real Estate"],
    long: false,
  },
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/demo-reception-v2.vpk",
    label: "Open the interior",
    id: "lnk-open-the-interior",
    image: "/assets/sample-1.webp",
    alt: "A designed reception interior with lounge seating and floor-to-ceiling glazing",
    title: ["Architects &", "interior designers"],
    long: true,
  },
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/demo-antique-camera.vpk",
    label: "See a product",
    id: "lnk-see-a-product",
    image: "/assets/sample-2.webp",
    alt: "An antique bellows camera on a wooden tripod, lit like a product shot",
    title: ["Verse for Commerce"],
    long: false,
  },
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/demo-bistro-v2.vpk",
    label: "Explore a world",
    id: "lnk-explore-a-world",
    image: "/assets/sample-3.webp",
    alt: "A large game-world street scene with buildings, trees and a market square (Amazon Lumberyard Bistro, CC BY 4.0)",
    title: ["Verse Play"],
    long: false,
  },
  {
    href: "/developers",
    label: "Build with Verse",
    id: "lnk-build-with-verse",
    image: "/assets/sample-4.webp",
    alt: "A photo-scanned marble bust, streamed at full detail",
    title: ["Verse API,", "SDK & MCP"],
    long: false,
  },
];

// ---------- Try it live ----------

export const tryHeading: SectionHeading = {
  number: "DON'T TAKE OUR WORD FOR IT",
  id: "try-heading",
  title: "Open one.",
  accent: "Right now, on your phone.",
  text: "These are real Verse scenes, streamed by the real engine. Not videos. Open one here, or scan the code to try it on the phone in your hand.",
};

/** Live scenes: link (also the QR code) and preview image; an empty image shows the "no image" stage. */
export const tryScenes = [
  {
    id: "tab-try-show-flat",
    scene: "https://verse.ctruh.com/view?vpk=ingest/demo-showflat-v2.vpk",
    image: "/assets/sample-0.webp",
    title: "Show flat",
    text: "Real estate · walk the apartment",
  },
  {
    id: "tab-try-reception-interior",
    scene: "https://verse.ctruh.com/view?vpk=ingest/demo-reception-v2.vpk",
    image: "/assets/sample-1.webp",
    title: "Reception interior",
    text: "Architecture · glass, light and stone",
  },
  {
    id: "tab-try-antique-camera",
    scene: "https://verse.ctruh.com/view?vpk=ingest/demo-antique-camera.vpk",
    image: "/assets/sample-2.webp",
    title: "Antique camera",
    text: "Commerce · a product, in AR on your phone",
  },
  {
    id: "tab-try-bistro-street",
    scene: "https://verse.ctruh.com/view?vpk=ingest/demo-bistro-v2.vpk",
    image: "/assets/sample-3.webp",
    title: "Bistro street",
    text: "Games · a full scene in a browser tab",
  },
  {
    id: "tab-try-chess-set",
    scene: "https://verse.ctruh.com/view?vpk=ingest/demo-chess-set.vpk",
    image: "",
    title: "Chess set",
    text: "Materials · polished wood and lacquer",
  },
];

// ---------- Inside the engine ----------

export const engineHeading: SectionHeading = {
  number: "INSIDE THE ENGINE",
  id: "engine-heading",
  title: "Deep tech underneath.",
  accent: "One link on top.",
  text: "We did not wrap someone else's renderer. To open a real city from a link, a deep-tech team in Bengaluru and San Francisco wrote all three layers itself. The core technology is patented.",
};

export const engineLayers = [
  { label: "LAYER 03", title: "The streaming layer", text: "Decides what to send, when, and in how much detail, as the camera moves." },
  { label: "LAYER 02", title: "The file format", text: "One file, built to be read a piece at a time, whether it holds a chair or a city." },
  { label: "LAYER 01", title: "The renderer", text: "Draws every scene on the viewer's own device, with no cloud GPU behind it." },
];

/** The nine techniques: list buttons and the panel text sections.ts shows for each. */
export const techniques = [
  {
    id: "tab-tech-virtualized-geometry-streaming",
    title: "Virtualized geometry streaming",
    text: "Only what the camera sees, at the detail the screen can show. The rest waits until you move.",
  },
  {
    id: "tab-tech-safe-paged-memory",
    title: "Safe paged memory",
    text: "Billions of triangles page in and out without holes or cracks, inside what the device can hold.",
  },
  {
    id: "tab-tech-gpu-feed-controller",
    title: "GPU feed controller",
    text: "A closed loop paces data to the graphics card, so streaming does not fight the frame you are looking at.",
  },
  {
    id: "tab-tech-adaptive-engine-router",
    title: "Adaptive engine router",
    text: "Reads each file and picks the best path: asset, interior, township or city. You upload; it decides.",
  },
  { id: "tab-tech-streamed-textures", title: "Streamed textures", text: "Textures and materials arrive as you look, within each device's memory." },
  {
    id: "tab-tech-device-adaptive-rendering",
    title: "Device-adaptive rendering",
    text: "WebGPU where it is available, WebGL2 elsewhere, tuned to each device. The link stays the same.",
  },
  {
    id: "tab-tech-faithful-material-capture",
    title: "Faithful material capture",
    text: "Glass, brushed metal, car paint and fabric sheen from Blender, Unity and Unreal arrive as they were designed.",
  },
  { id: "tab-tech-signed-scenes", title: "Signed scenes", text: "Every scene is signed, so it cannot be silently altered." },
  { id: "tab-tech-instant-home", title: "Instant Home", text: "A floor plan becomes a walkable home in about a minute." },
];

// ---------- Delivery cost ----------

export const costHeading: SectionHeading = {
  number: "WHY VIEWERS NEVER PAY",
  id: "cost-heading",
  title: "The viewer's device draws it.",
  accent: "So delivery costs almost nothing.",
  text: "Cloud streaming runs a GPU server for every person watching. Verse sends the scene to the device in their hand. Drag to see what that means at your scale.",
};

export const costScale = ["1K", "10K", "100K", "1M"];

// ---------- Plug-ins ----------

/** Publishing tools: tab, details panel and drawing (plugins.ts switches them). */
export const plugins = [
  {
    model: "blender" as const,
    name: "Blender",
    alt: "Illustration of a detailed ceramic vessel published from Blender to a browser",
    description: "Publish a scene in one click, straight from the sidebar.",
    time: 45,
    label: "Scene to link",
    scene: "Scene → link",
  },
  {
    model: "unity" as const,
    name: "Unity",
    alt: "Illustration of an industrial hall scene published from Unity to a browser",
    description: "Ship Unity scenes to the web without a WebGL build.",
    time: 101,
    label: "Scene to link",
    scene: "Scene → link",
  },
  {
    model: "unreal" as const,
    name: "Unreal Engine",
    alt: "Illustration of an architectural level published from Unreal Engine to a browser",
    description: "Cinematic Unreal levels that open on any phone.",
    time: 70,
    label: "Level to link",
    scene: "Level → link",
  },
];

export const publishingLabels = ["Native editor", "Publish", "One link"];

// ---------- Developers ----------

export const devHeading: SectionHeading = {
  number: "FOR BUILDERS",
  id: "dev-heading",
  title: "One upload in.",
  accent: "A link, an embed or a tool call out.",
  text: "Drop one tag on any page, or automate everything with the REST API and SDK: upload, publish, embed, track. Free includes 5,000 API calls a month.",
};

export const devTabs = [
  { id: "tab-dev-embed", code: "embed", label: "Embed", badge: "" },
  { id: "tab-dev-rest", code: "rest", label: "REST", badge: "" },
  { id: "tab-dev-mcp", code: "mcp", label: "MCP ", badge: "EARLY" },
];

export const devFeatures = [
  { title: "REST API & SDK", text: "Upload, publish, private links and analytics, with React and Vue wrappers and signed webhooks." },
  { title: "Embeds", text: "One <verse-viewer> tag on any site, plus ready-made embeds for Shopify, Webflow, WordPress, Wix and Squarespace." },
  { title: "MCP server", text: "AI assistants can upload a 3D file and hand back a published link." },
];

// ---------- Pricing ----------

export const pricingHeading: SectionHeading = {
  number: "PRICING",
  id: "pricing-heading",
  title: "Free to start.",
  accent: "Viewers never pay.",
  text: "Every published scene opens for everyone. Every new account gets a 14-day trial with Pro features, and you sign in with a one-time code.",
};

export const plans = [
  { name: "Free", badge: "", from: false, price: "$0", monthly: false, text: "Try Verse on your own models.", className: "" },
  { name: "Starter", badge: "", from: false, price: "$29", monthly: true, text: "For the agent or designer sharing a few spaces a month.", className: "" },
  { name: "Pro", badge: "Most picked", from: false, price: "$99", monthly: true, text: "For the professional who shows spaces every week.", className: "pick" },
  { name: "Scale", badge: "", from: false, price: "$499", monthly: true, text: "For teams and developers running Verse every day.", className: "" },
  {
    name: "Enterprise",
    badge: "",
    from: true,
    price: "$2,000",
    monthly: true,
    text: "SSO, white-label and an SLA. A specialist calls back within 30 minutes during business hours.",
    className: "dark",
  },
];

export const contactUrl = "https://www.ctruh.com/about/company/contact-us";

// ---------- FAQ ----------

export const faqs = [
  {
    q: "What is Verse Engine?",
    a: "Ctruh's own browser-native 3D engine and the streaming layer for 3D. Upload a 3D file, send a floor plan or publish from Blender, Unity or Unreal, and get a link that opens in a modern browser on everyday devices.",
  },
  {
    q: "Do viewers need an app, a plug-in or a powerful device?",
    a: "No. A Verse link opens in a modern browser on Windows, macOS, Linux, Android and iOS. The viewer's own device draws the scene, and it only receives what it can see. Viewers never pay.",
  },
  {
    q: "Is Verse only for cities?",
    a: "No. A product, a building, a factory and a game world all run on the same engine. Lyon is the proof of scale; everything smaller opens the same way.",
  },
  {
    q: "What was Lyon measured on?",
    a: "Chrome on laptops. Across our test laptops the first picture took 2–8 s. The benchmark table was measured on an Apple M5 Pro, and on Windows with an RTX 5060 Lyon ran at about 45–60 fps.",
  },
  {
    q: "Which files and tools can I bring?",
    a: "20+ formats, including glTF, FBX, OBJ, USDZ, CAD, BIM through IFC, scans and splats. Blender, Unity and Unreal publish with one click, and Substance 3D Painter is in beta.",
  },
  {
    q: "What about AR and XR?",
    a: "The same scene link supports Web 3D, augmented reality and extended reality. On a phone, View in AR places a product in the room; on desktop, a QR code opens it there.",
  },
  {
    q: "Can a scene change after I share it?",
    a: "Yes. Update the scene without changing its link. Links can be private, revocable and embedded on your website, and every scene is signed.",
  },
  {
    q: "How is it different from a 3D library?",
    a: "A library gives you parts to assemble: loading, streaming, compression, hosting, sharing and analytics are yours to build. Verse ships them as one product, so a scene goes from file to link without a build project.",
  },
  {
    q: "How much does it cost?",
    a: "Free to start, then Starter at $29, Pro at $99 and Scale at $499 a month, with Enterprise from $2,000 a month. Every new account gets a 14-day Pro trial. Viewers never pay.",
  },
];
