# Verse Engine website

Vite + React single-page app. Use Node.js 22.18 or later; run `npm ci` once.

- `npm run dev` starts the development server with live reload.
- `npm run build` builds the deployable site into `dist/` (generated, not committed); `npm start` previews it at http://127.0.0.1:4173/.
- `npm run check` validates routes, payloads, resources, syntax and JSON. With the preview running, `node tools/verify.ts --http=http://127.0.0.1:4173` also fetches every route and a missing route.
- `npm run content` regenerates the documentation payloads in `public/content/`, the docs chapter list (`src/pages/docs/nav.json`), `sitemap.xml` and `robots.txt` from `source/` (set `SITE_ORIGIN=https://your-domain` for a real domain).

Code is in `src/`: TypeScript pages in `src/pages/` (TSX pages listed in `src/pages/index.ts`; titles and descriptions in `src/pages/meta.ts`), the app in `src/app/` (`App.tsx`, `Shell.tsx`, `routes.ts`), shared components in `src/components/` (`layout/` for the header, footer and menus, `ui/` for reusable pieces such as `SiteButton` and `PageHero`), hooks in `src/hooks/`, helpers in `src/utils/`, shared data in `src/data/`, styles in `src/styles/`, the GSAP/Three.js animation in `src/animations/`. A page with its own data or parts has its own folder (e.g. `src/pages/landing/` with `sections/`, `src/pages/plugins/`, `src/pages/pricing/`). Build and generator scripts are TypeScript too. Files in `public/` are served unchanged at the same paths: styles in `public/css/`, images and fonts in `public/assets/`.

Deploy with the provided `vercel.json` (installs, builds and publishes `dist/`, rewrites extension-less paths to `/index.html`). The full developer handoff is in `../README.md` and `../docs/`.
