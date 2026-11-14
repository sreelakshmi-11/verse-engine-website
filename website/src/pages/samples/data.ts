// The sample cards of the Samples page: what each one links to and shows. Image: /assets/sample-<n>.webp.

export interface Sample {
  href: string;
  /** The link's accessible name. */
  label: string;
  alt: string;
  title: string;
  text: string;
  /** The call to action shown on the card. */
  action: string;
  /** The card link's id (from the button ID sheet). */
  id: string;
}

export const SAMPLES: Sample[] = [
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/showflat-2026-0c5cab173679.vpk",
    label: "Walk the apartment",
    alt: "A furnished living room and dining area, rendered live in the browser",
    title: "Verse for Real Estate",
    text: "Sell homes before they're built. A walkable home on every buyer's phone, from a floor plan, in a minute.",
    action: "Walk the apartment",
    id: "samples_real_scenes_walk_the_apartment",
  },
  {
    href: "/docs/guides/publish-from-ifc",
    label: "Open the interior",
    alt: "A designed reception interior with lounge seating and floor-to-ceiling glazing",
    title: "Architects and interior designers",
    text: "Share the whole design at full detail, straight from your design tool with a Verse plug-in.",
    action: "Read the IFC guide",
    id: "samples_real_scenes_read_the_ifc_guide",
  },
  {
    href: "https://verse.ctruh.com/view?vpk=ingest/demo-antique-camera.vpk",
    label: "See a product",
    alt: "An antique bellows camera on a wooden tripod, lit like a product shot",
    title: "Verse for Commerce",
    text: "Products that look exactly as designed, on any store, any phone.",
    action: "See a product",
    id: "samples_real_scenes_see_a_product",
  },
  {
    href: "/docs/guides/publish-from-unreal",
    label: "Explore a world",
    alt: "A large game-world street scene with buildings, trees and a market square (Amazon Lumberyard Bistro, CC BY 4.0)",
    title: "Verse Play",
    text: "Your Blender, Unity or Unreal world in a browser tab, not a download. Host web games on a fast, isolated domain.",
    action: "Read the Unreal guide",
    id: "samples_real_scenes_read_the_unreal_guide",
  },
  {
    href: "/developers",
    label: "Build with Verse",
    alt: "A photo-scanned marble bust, streamed at full detail",
    title: "Verse API, SDK and MCP",
    text: "For developers and AI agents. One line of code, or one AI tool call, turns any 3D into a link.",
    action: "Build with Verse",
    id: "samples_real_scenes_build_with_verse",
  },
];
