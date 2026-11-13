// App entry: renders the shell (App.tsx). A prerendered page loads its code first and is hydrated, not re-rendered.
import { createRoot, hydrateRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { META } from "./pages/meta.ts";
import { loadPage, routeOf } from "./routes.ts";

const path = routeOf(location.pathname);
if (document.documentElement.classList.contains("prerendered") && META[path]?.prerender) {
  await loadPage(path);
  hydrateRoot(document.body, <App />);
} else {
  createRoot(document.body).render(<App />);
}
