// Routes whose page is a React component, each loaded on demand (src/app/routes.ts). Docs pages use DocsPage.tsx.
import type { ComponentType } from "react";

export const PAGES: Record<string, () => Promise<{ default: ComponentType }>> = {
  "/": () => import("./landing/Landing.tsx"),
  "/about": () => import("./About.tsx"),
  "/developers": () => import("./Developers.tsx"),
  "/pricing": () => import("./pricing/Pricing.tsx"),
  "/samples": () => import("./samples/Samples.tsx"),
  "/plugins": () => import("./plugins/Plugins.tsx"),
  "/plugins/blender": () => import("./plugins/PluginBlender.tsx"),
  "/plugins/unity": () => import("./plugins/PluginUnity.tsx"),
  "/plugins/unreal": () => import("./plugins/PluginUnreal.tsx"),
  "/challenge": () => import("./Challenge.tsx"),
  "/signin": () => import("./Signin.tsx"),
  "/studio": () => import("./studio/Studio.tsx"),
  "/privacy": () => import("./legal/Privacy.tsx"),
  "/terms": () => import("./legal/Terms.tsx"),
  "/refunds": () => import("./legal/Refunds.tsx"),
  "/use-cases/3d-commerce": () => import("./resources/Commerce.tsx"),
  "/use-cases/architecture-real-estate": () => import("./resources/ArchitectureRealEstate.tsx"),
  "/ai-3d-infrastructure": () => import("./resources/AiInfrastructure.tsx"),
  "/demos/lyon": () => import("./resources/LyonDemo.tsx"),
  "/404": () => import("./NotFound.tsx"),
};
