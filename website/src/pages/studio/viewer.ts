// 3D preview of a Playground scene (Three.js, rendered on demand): drag to look, WASD or arrow keys to walk,
// scroll to zoom. `cleanups` collects what to undo.
import { seeded } from "./data.ts";
import type { SceneKind } from "./data.ts";
import type { BufferGeometry, WebGLRenderer } from "three";

export async function mountViewer(el: HTMLElement, kind: SceneKind, cleanups: (() => void)[]): Promise<boolean | undefined> {
  let THREE: typeof import("three");
  try {
    THREE = await import("three");
  } catch {
    return false;
  }
  if (!el.isConnected) return;
  let renderer: WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch {
    return false;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  el.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f7);
  const cam = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 200);
  cam.position.set(0, 1.6, 6);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdddde2, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(5, 8, 4);
  scene.add(sun);
  const mat = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 });
  const add = (g: BufferGeometry, c: number, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(g, mat(c));
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  };
  add(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), 0xfafafc, 0, 0, 0);
  scene.add(new THREE.GridHelper(60, 60, 0xe0e0e0, 0xe0e0e0));
  const B = 0x0066cc,
    G = 0xd2d2d7,
    W = 0xffffff;
  const box = (w: number, h: number, d: number, c: number, x: number, z: number, y = 0) => add(new THREE.BoxGeometry(w, h, d), c, x, y + h / 2, z);
  if (kind === "sofa") {
    box(3, 0.5, 1.2, B, 0, 0);
    box(3, 0.8, 0.3, B, 0, -0.5, 0.5);
    box(0.3, 0.7, 1.2, B, -1.5, 0);
    box(0.3, 0.7, 1.2, B, 1.5, 0);
    box(1.4, 0.08, 1, W, 0, 2.2, 0.4);
  } else if (kind === "shoe") {
    box(2.6, 0.3, 1, W, 0, 0);
    box(1.6, 0.7, 0.9, B, -0.4, 0, 0.3);
    box(0.9, 0.45, 0.8, B, 0.9, 0, 0.3);
  } else if (kind === "scan") {
    const r = seeded("scan");
    const pts = new Float32Array(9000);
    for (let i = 0; i < 3000; i++) {
      const f = r();
      pts.set(
        f < 0.5 ? [(r() - 0.5) * 12, 0.01, (r() - 0.5) * 12] : f < 0.8 ? [r() < 0.5 ? -6 : 6, r() * 3.2, (r() - 0.5) * 12] : [(r() - 0.5) * 12, r() * 3.2, -6],
        i * 3,
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: B, size: 0.06 })));
  } else if (kind === "building") {
    box(8, 3, 0.2, G, 0, -4, 0);
    box(0.2, 3, 8, G, -4, 0);
    box(0.2, 3, 8, G, 4, 0);
    box(1.5, 0.9, 1.5, B, -2, -2);
    box(1.5, 0.9, 1.5, B, 2, 1);
    box(3, 0.7, 1, W, 0, 3);
  } else {
    box(10, 0.15, 8, W, 0, 0);
    box(10, 3, 0.2, G, 0, -4);
    box(0.2, 3, 8, G, -5, 0);
    box(0.2, 1.1, 3, G, 5, -2.2);
    box(3, 0.5, 1.2, B, -1, -2.5);
    box(1.8, 0.5, 1.8, W, 0, -0.2, 0.45);
    box(1.8, 0.08, 1.2, B, 0, -0.2, 1);
    box(2, 0.45, 1, G, 2.5, 2.5);
    box(1.4, 2, 0.8, B, -3.5, 2.8);
  }
  let yaw = 0,
    pitch = -0.05,
    dist = 6,
    dirty = true;
  const keys = new Set<string>();
  let pos = new THREE.Vector3(0, 1.6, 6);
  const fwd = () => new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  function render() {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (w && renderer.domElement.width !== Math.floor(w * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    }
    cam.position.copy(pos);
    cam.rotation.order = "YXZ";
    cam.rotation.set(pitch, yaw, 0);
    cam.fov = 55 * (dist / 6);
    cam.fov = Math.min(95, Math.max(25, cam.fov));
    cam.updateProjectionMatrix();
    renderer.render(scene, cam);
    dirty = false;
  }
  let drag: [number, number] | null = null,
    raf = 0;
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };
  function tick() {
    raf = 0;
    if (keys.size) {
      const f = fwd(),
        r = new THREE.Vector3(f.z * -1, 0, f.x),
        s = 0.12;
      if (keys.has("w") || keys.has("arrowup")) pos.addScaledVector(f, s);
      if (keys.has("s") || keys.has("arrowdown")) pos.addScaledVector(f, -s);
      if (keys.has("a") || keys.has("arrowleft")) pos.addScaledVector(r, -s);
      if (keys.has("d") || keys.has("arrowright")) pos.addScaledVector(r, s);
      dirty = true;
    }
    if (dirty) render();
    if (keys.size) kick();
  }
  const on = <K extends keyof HTMLElementEventMap>(
    t: HTMLElement,
    ev: K,
    fn: (e: HTMLElementEventMap[K]) => void,
    o: AddEventListenerOptions | undefined = undefined,
  ) => {
    t.addEventListener(ev, fn, o);
    cleanups.push(() => t.removeEventListener(ev, fn, o));
  };
  on(el, "pointerdown", (e) => {
    drag = [e.clientX, e.clientY];
    el.setPointerCapture(e.pointerId);
  });
  on(el, "pointermove", (e) => {
    if (!drag) return;
    yaw -= (e.clientX - drag[0]) * 0.005;
    pitch = Math.max(-1.2, Math.min(1.2, pitch - (e.clientY - drag[1]) * 0.005));
    drag = [e.clientX, e.clientY];
    dirty = true;
    kick();
  });
  on(el, "pointerup", () => {
    drag = null;
  });
  on(
    el,
    "wheel",
    (e) => {
      e.preventDefault();
      dist = Math.max(2, Math.min(12, dist + e.deltaY * 0.004));
      dirty = true;
      kick();
    },
    { passive: false },
  );
  el.tabIndex = 0;
  el.setAttribute("role", "application");
  el.setAttribute("aria-label", "3D scene preview. Drag to look, W A S D or arrow keys to walk, scroll to zoom.");
  on(el, "keydown", (e) => {
    const k = e.key.toLowerCase();
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
      e.preventDefault();
      keys.add(k);
      kick();
    }
  });
  on(el, "keyup", (e) => {
    keys.delete(e.key.toLowerCase());
  });
  on(el, "blur", () => keys.clear());
  const ro = new ResizeObserver(() => {
    dirty = true;
    kick();
  });
  ro.observe(el);
  cleanups.push(() => {
    ro.disconnect();
    cancelAnimationFrame(raf);
    renderer.dispose();
  });
  render();
  return true;
}
