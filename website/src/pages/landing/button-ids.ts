// Button ids of the home page (from the button ID sheet), by address: the home page and the section addresses
// /inside-the-engine and /how-to-start show the same page, each with its own ids. Lists follow the order on the page.
import { useLocation } from "react-router-dom";

export interface HomeButtonIds {
  heroTryItFree?: string;
  /** Web 3D, AR, XR */
  experience?: string[];
  nextDimensionTryItFree?: string;
  /** street details, triangles on screen, frame time, first picture */
  benchmarks?: string[];
  /** Ctruh Homes, Verse plug-ins, Ctruh Capture, Ctruh Worlds */
  create?: string[];
  /** the five live scenes */
  scenes?: string[];
  /** the "Open it here ↗" link, by selected scene */
  openItHere?: string[];
  /** the nine techniques */
  engine?: string[];
  challenge?: string;
  toolsSeeAll?: string;
  /** Blender, Unity, Unreal Engine */
  tools?: string[];
  buildersReadTheDocs?: string;
  pricingCompare?: string;
  pricingTalk?: string;
  closingTryItFree?: string;
  closingSeePricing?: string;
}

export const HOME_BUTTON_IDS: Record<string, HomeButtonIds> = {
  "/": {
    heroTryItFree: "home_hero_try_it_free",
    experience: ["home_experience_web_3d", "home_experience_ar", "home_experience_xr"],
    nextDimensionTryItFree: "home_next_dimension_try_it_free",
    benchmarks: ["home_benchmarks_street_details", "home_benchmarks_triangles_on_screen", "home_benchmarks_frame_time", "home_benchmarks_first_picture"],
    create: ["home_create_ctruh_homes", "home_create_verse_plug_ins", "home_create_ctruh_capture", "home_create_ctruh_worlds"],
    scenes: ["home_proof_show_flat", "home_proof_reception_interior", "home_proof_antique_camera", "home_proof_bistro_street", "home_proof_chess_set"],
    openItHere: [
      "home_show_flat_open_it_here",
      "home_reception_interior_open_it_here",
      "home_antique_camera_open_it_here",
      "home_bistro_street_open_it_here",
      "home_chess_set_open_it_here",
    ],
    engine: [
      "home_engine_virtualized_geometry_streaming",
      "home_engine_safe_paged_memory",
      "home_engine_gpu_feed_controller",
      "home_engine_adaptive_engine_router",
      "home_engine_streamed_textures",
      "home_engine_device_adaptive_rendering",
      "home_engine_faithful_material_capture",
      "home_engine_signed_scenes",
      "home_engine_instant_home",
    ],
    challenge: "home_challenge_take_the_challenge",
    toolsSeeAll: "home_your_tools_see_all_plug_ins",
    tools: ["home_your_tools_blender", "home_your_tools_unity", "home_your_tools_unreal_engine"],
    pricingCompare: "home_pricing_compare_plans",
    pricingTalk: "home_pricing_talk_to_us",
    closingTryItFree: "home_closing_try_it_free",
    closingSeePricing: "home_closing_see_pricing",
  },
  "/inside-the-engine": {
    scenes: [
      "inside_the_engine_proof_show_flat",
      "inside_the_engine_proof_reception_interior",
      "inside_the_engine_proof_antique_camera",
      "inside_the_engine_proof_bistro_street",
      "inside_the_engine_proof_chess_set",
    ],
    openItHere: [
      "inside_the_engine_show_flat_open_it_here",
      "inside_the_engine_reception_interior_open_it_here",
      "inside_the_engine_antique_camera_open_it_here",
      "inside_the_engine_bistro_street_open_it_here",
      "inside_the_engine_chess_set_open_it_here",
    ],
    engine: [
      "inside_the_engine_deep_tech_virtualized_geometry_streaming",
      "inside_the_engine_deep_tech_safe_paged_memory",
      "inside_the_engine_deep_tech_gpu_feed_controller",
      "inside_the_engine_deep_tech_adaptive_engine_router",
      "inside_the_engine_deep_tech_streamed_textures",
      "inside_the_engine_deep_tech_device_adaptive_rendering",
      "inside_the_engine_deep_tech_faithful_material_capture",
      "inside_the_engine_deep_tech_signed_scenes",
      "inside_the_engine_deep_tech_instant_home",
    ],
    challenge: "inside_the_engine_challenge_take_the_challenge",
    toolsSeeAll: "inside_the_engine_your_tools_see_all_plug_ins",
    tools: ["inside_the_engine_your_tools_blender", "inside_the_engine_your_tools_unity", "inside_the_engine_your_tools_unreal_engine"],
    buildersReadTheDocs: "inside_the_engine_builders_read_the_docs",
    pricingCompare: "inside_the_engine_pricing_compare_plans",
    pricingTalk: "inside_the_engine_pricing_talk_to_us",
    closingTryItFree: "inside_the_engine_closing_try_it_free",
    closingSeePricing: "inside_the_engine_closing_see_pricing",
  },
  "/how-to-start": {
    heroTryItFree: "how_to_start_hero_try_it_free",
    experience: ["how_to_start_experience_web_3d", "how_to_start_experience_ar", "how_to_start_experience_xr"],
    nextDimensionTryItFree: "how_to_start_next_dimension_try_it_free",
    benchmarks: [
      "how_to_start_benchmarks_street_details",
      "how_to_start_benchmarks_triangles_on_screen",
      "how_to_start_benchmarks_frame_time",
      "how_to_start_benchmarks_first_picture",
    ],
    create: ["how_to_start_create_ctruh_homes", "how_to_start_create_verse_plug_ins", "how_to_start_create_ctruh_capture", "how_to_start_create_ctruh_worlds"],
    scenes: [
      "how_to_start_proof_show_flat",
      "how_to_start_proof_reception_interior",
      "how_to_start_proof_antique_camera",
      "how_to_start_proof_bistro_street",
      "how_to_start_proof_chess_set",
    ],
    openItHere: [
      "how_to_start_show_flat_open_it_here",
      "how_to_start_reception_interior_open_it_here",
      "how_to_start_antique_camera_open_it_here",
      "how_to_start_bistro_street_open_it_here",
      "how_to_start_chess_set_open_it_here",
    ],
    engine: [
      "how_to_start_engine_virtualized_geometry_streaming",
      "how_to_start_engine_safe_paged_memory",
      "how_to_start_engine_gpu_feed_controller",
      "how_to_start_engine_adaptive_engine_router",
      "how_to_start_engine_streamed_textures",
      "how_to_start_engine_device_adaptive_rendering",
      "how_to_start_engine_faithful_material_capture",
      "how_to_start_engine_signed_scenes",
      "how_to_start_engine_instant_home",
    ],
    challenge: "how_to_start_challenge_take_the_challenge",
    toolsSeeAll: "how_to_start_your_tools_see_all_plug_ins",
    tools: ["how_to_start_your_tools_blender", "how_to_start_your_tools_unity", "how_to_start_your_tools_unreal_engine"],
    pricingCompare: "how_to_start_pricing_compare_plans",
    pricingTalk: "how_to_start_pricing_talk_to_us",
    closingTryItFree: "how_to_start_closing_try_it_free",
    closingSeePricing: "how_to_start_closing_see_pricing",
  },
};

/** The ids for the address shown (other home addresses, such as /story, use the home page's). */
export function useHomeButtonIds(): HomeButtonIds {
  return HOME_BUTTON_IDS[useLocation().pathname.replace(/\/+$/, "") || "/"] ?? HOME_BUTTON_IDS["/"];
}
