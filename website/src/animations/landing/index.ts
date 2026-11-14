import { realityModes } from "../../pages/landing/data.ts";
import { createPluginShowcase } from "./plugins.ts";
import { createShowcase } from "./showcase.ts";
import { createDeviceMorph } from "./device-morph.ts";
import { createEnhancements } from "./enhancements.ts";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Experience } from "./model.ts";
import type { RealityMode } from "../../pages/landing/data.ts";
import { twoDigits } from "../../utils/format.ts";
/** Look-ups in the landing page's markup (present while it is mounted). */
export const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!,
  $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];
/** Scrolls to a position, an element (selector) or the top; `instant` skips the smooth scroll. */
export type ScrollToTarget = (target: number | string, instant?: boolean) => void;
/** What the landing modules (plug-ins, showcase, device morph, enhancements) are given. */
export interface LandingTools {
  gsap: typeof gsap;
  ST: typeof ScrollTrigger;
  reduced: boolean;
  scrollToTarget: ScrollToTarget;
}
/** Mount the landing story into the current document. Returns a dispose function. */
export async function mount() {
  const html = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("motion-off");
  html.classList.add("js");
  if (reduced) html.classList.add("reduced-motion");
  const fallbackTimer = setTimeout(() => {
    if (!html.classList.contains("story-ready") && !html.classList.contains("gl-ready")) html.classList.add("static-story", "no-gl");
  }, 5000);
  const ST = ScrollTrigger;
  gsap.registerPlugin(ST);
  const cleanups: (() => void)[] = [],
    driver = { p: 0 },
    pointer = { x: 0, y: 0 },
    aim = { x: 0, y: 0 };
  let experience: Experience | null = null,
    storyTrigger: ScrollTrigger | null | undefined = null,
    lenis: Lenis | null = null,
    paused = false,
    chapter = -1,
    mode = "web",
    visible = true;
  function clamp(a: number, b: number, x: number) {
    return Math.min(b, Math.max(a, x));
  }
  function smooth(a: number, b: number, x: number) {
    let t = clamp(0, 1, (x - a) / (b - a));
    return t * t * (3 - 2 * t);
  }
  function mix(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  const menu = $<HTMLDialogElement>("#menu-dialog");
  const onMenu = (e: Event) => ((e as CustomEvent<{ open: boolean }>).detail.open ? lenis?.stop() : lenis?.start());
  document.addEventListener("verse:menu", onMenu);
  cleanups.push(() => document.removeEventListener("verse:menu", onMenu));
  const scrollToTarget: ScrollToTarget = (target, instant = false) => {
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target, {
        immediate: instant,
        offset: typeof target === "string" ? -85 : 0,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else if (typeof target === "number") scrollTo({ top: target, behavior: instant || reduced ? "instant" : "smooth" });
    else $(target)?.scrollIntoView({ behavior: instant || reduced ? "instant" : "smooth" });
  };
  function seekStory(value: number, instant = false) {
    const story = storyTrigger!;
    scrollToTarget(story.start + (value / 7) * (story.end - story.start), instant);
    if (instant) {
      ST.update();
      story.getTween()?.progress(1);
      driver.p = value;
      applyStory(0);
    }
  }
  const onHashClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest('a[href^="#"]');
    if (!a || a.hasAttribute("data-jump")) return;
    let target = a.getAttribute("href")!;
    if (menu.open) menu.close();
    if (target === "#") {
      e.preventDefault();
      scrollToTarget(0);
      history.replaceState(null, "", location.pathname + location.search);
    } else if ($(target)) {
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", target);
    }
  };
  document.addEventListener("click", onHashClick);
  cleanups.push(() => document.removeEventListener("click", onHashClick));
  $$("[data-jump]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      if (menu.open) menu.close();
      const n = Number(b.dataset.jump);
      $(".story").dataset.requestedChapter = String(n);
      if (storyTrigger) seekStory(n === 5 ? 7 : n, e.detail === 0);
      else scrollToTarget("#chapter-" + n, true);
    }),
  );
  $(".motion-toggle").addEventListener("click", () => {
    paused = !paused;
    $(".motion-toggle").setAttribute("aria-pressed", String(paused));
    $(".motion-toggle").setAttribute("aria-label", paused ? "Resume ambient animation" : "Pause ambient animation");
    $(".motion-toggle>span").textContent = paused ? "▶" : "Ⅱ";
    $(".motion-toggle small").textContent = paused ? "Resume motion" : "Pause motion";
  });
  const deviceMorph = createDeviceMorph({ gsap, reduced });
  cleanups.push(() => deviceMorph.dispose());
  const modes: Record<string, RealityMode> = Object.fromEntries(realityModes.map((m) => [m.mode, m]));
  function setMode(name: string, focus = false) {
    mode = name;
    $(".device-frame").dataset.mode = name;
    $$(".reality-tabs [data-mode]").forEach((b) => {
      const active = b.dataset.mode === name;
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
      if (active && focus) b.focus();
    });
    $("#reality-description").textContent = modes[name].copy;
    $("#mode-description").textContent = modes[name].note;
    // the tab's id is the button id of the address shown (some addresses have none)
    const tab = $(`.reality-tabs [data-mode="${name}"]`);
    if (tab.id) $("#mode-description").setAttribute("aria-labelledby", tab.id);
    else $("#mode-description").removeAttribute("aria-labelledby");
    $(".device-status").textContent = modes[name].status;
  }
  function selectMode(name: string, focus = false, instant = false) {
    const value = ["web", "ar", "xr"].indexOf(name);
    if (storyTrigger) {
      seekStory(4 + value, instant);
      if (focus) $(`.reality-tabs [data-mode="${name}"]`).focus();
    } else {
      setMode(name, focus);
      deviceMorph.to(value, instant || reduced);
    }
  }
  const tabButtons = $$(".reality-tabs [data-mode]");
  tabButtons.forEach((b, i) => {
    b.addEventListener("click", (event) => selectMode(b.dataset.mode!, false, event.detail === 0));
    b.addEventListener("keydown", (e) => {
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        const n = e.key === "Home" ? 0 : e.key === "End" ? 2 : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
        selectMode(tabButtons[n].dataset.mode!, true, true);
      }
    });
  });
  function staticStory() {
    html.classList.remove("story-ready");
    html.classList.add("static-story", "no-gl");
    document.documentElement.style.setProperty("--stage-ink", "#1d1d1f");
    document.documentElement.style.setProperty("--stage-muted", "#59616e");
  }
  const desktopPoses: Record<string, number>[] = [
    { x: 0.74, y: 0.46, scale: 1, rx: 0.12, ry: -0.45, rz: -0.16, explode: 0, solid: 1, wire: 0, spread: 0, particles: 0, shadow: 0.8, dark: 0 },
    { x: 0.71, y: 0.48, scale: 1.04, rx: 0.17, ry: 0.32, rz: 0.12, explode: 0.16, solid: 0.08, wire: 1, spread: 0.08, particles: 0.25, shadow: 0, dark: 1 },
    { x: 0.72, y: 0.52, scale: 0.83, rx: -0.1, ry: 0.1, rz: -0.18, explode: 1, solid: 0.1, wire: 0.6, spread: 1, particles: 1.5, shadow: 0, dark: 0 },
    {
      x: 0.74,
      y: 0.49,
      scale: 0.29,
      rx: 0.18,
      ry: Math.PI * 2 - 0.4,
      rz: 0.14,
      explode: 0,
      solid: 1,
      wire: 0.05,
      spread: 0,
      particles: 0.1,
      shadow: 0,
      dark: 0,
    },
    { x: 0.72, y: 0.51, scale: 0.78, rx: 0.06, ry: Math.PI * 2 - 0.24, rz: -0.04, explode: 0, solid: 1, wire: 0, spread: 0, particles: 0, shadow: 0, dark: 1 },
    {
      x: 0.26,
      y: 0.49,
      scale: 0.89,
      rx: -0.18,
      ry: Math.PI * 2 + 1.04,
      rz: 0.14,
      explode: 0,
      solid: 1,
      wire: 0,
      spread: 0,
      particles: 0,
      shadow: 0.55,
      dark: 0,
    },
  ];
  const backgrounds = ["#ffffff", "#0066cc", "#ffffff", "#edf3ff", "#0066cc", "#ffffff"];
  const bgMix = backgrounds.slice(0, -1).map((c, i) => gsap.utils.interpolate(c, backgrounds[i + 1]));
  const darkMix = ["#1d1d1f", "#ffffff", "#1d1d1f", "#1d1d1f", "#ffffff", "#1d1d1f"];
  const inkMix = darkMix.slice(0, -1).map((c, i) => gsap.utils.interpolate(c, darkMix[i + 1]));
  const muted = ["#59616e", "#ffffff", "#59616e", "#59616e", "#ffffff", "#59616e"];
  const mutedMix = muted.slice(0, -1).map((c, i) => gsap.utils.interpolate(c, muted[i + 1]));
  const storyCta = $(".story-cta"),
    heroBtn = $(".hero-panel .button");
  const ctaBgs = ["#3d75f3", "#ffffff", "#3d75f3", "#3d75f3", "#ffffff", "#3d75f3"],
    ctaInks = ["#ffffff", "#0066cc", "#ffffff", "#ffffff", "#0066cc", "#ffffff"];
  const ctaBgMix = ctaBgs.slice(0, -1).map((c, i) => gsap.utils.interpolate(c, ctaBgs[i + 1])),
    ctaInkMix = ctaInks.slice(0, -1).map((c, i) => gsap.utils.interpolate(c, ctaInks[i + 1]));
  function paintCta(i: number, f: number) {
    if (!storyCta || innerWidth >= 600) return;
    storyCta.style.setProperty("--cta-bg", ctaBgMix[i](f));
    storyCta.style.setProperty("--cta-ink", ctaInkMix[i](f));
  }
  function followCta(p: number) {
    if (!storyCta || !heroBtn) return;
    if (innerWidth >= 600) {
      storyCta.style.top = storyCta.style.bottom = storyCta.style.transform = storyCta.style.width = storyCta.style.right = "";
      return;
    }
    const stage = storyCta.parentElement!,
      sr = stage.getBoundingClientRect(),
      hr = heroBtn.getBoundingClientRect(),
      h = storyCta.offsetHeight || 46;
    const start = hr.top - sr.top + p * 64,
      end = sr.height - 92 - h,
      t = smooth(0, 0.8, p);
    const full = sr.width - 48;
    storyCta.style.top = "0";
    storyCta.style.bottom = "auto";
    storyCta.style.right = "auto";
    storyCta.style.width = Math.round(hr.width + (full - hr.width) * t) + "px";
    storyCta.style.transform = "translate3d(0," + Math.round(start + (end - start) * t) + "px,0)";
  }
  function applyStory(t: number) {
    const raw = clamp(0, 7, driver.p),
      p = raw <= 4 ? raw : raw <= 6 ? 4 : raw - 2;
    $(".story").dataset.progress = p.toFixed(3);
    followCta(p);
    $(".story").dataset.scrollProgress = raw.toFixed(3);
    const phase = clamp(0, 2, raw - 4),
      view = phase < 1 ? smooth(0.25, 0.75, phase) : 1 + smooth(1.25, 1.75, phase);
    if (raw > 3.5 && raw < 6.5) {
      const next = ["web", "ar", "xr"][Math.round(view)];
      if (next !== mode) setMode(next);
      deviceMorph.render(view);
    }
    const i = Math.min(4, Math.floor(p)),
      f = smooth(0.12, 0.88, p - i),
      mobile = innerWidth < 600,
      pose: Record<string, number> = {};
    for (const key of Object.keys(desktopPoses[0])) pose[key] = mix(desktopPoses[i][key], desktopPoses[i + 1][key], f);
    if (mobile) {
      const my = [0.68, 0.62, 0.63, 0.67, 0.63, 0.63],
        mx = [0.56, 0.56, 0.56, 0.5, 0.54, 0.5],
        ss = [0.78, 0.76, 0.66, 0.25, 0.58, 0.74];
      pose.x = mix(mx[i], mx[i + 1], f);
      pose.y = mix(my[i], my[i + 1], f);
      pose.scale = mix(ss[i], ss[i + 1], f);
    } else if (innerWidth <= 900) {
      const sx = [0.8, 0.8, 0.8, 0.8, 0.8, 0.26];
      pose.x = mix(sx[i], sx[i + 1], f);
      pose.scale *= 0.8;
    }
    if (Math.abs(p - 4) < 0.35) {
      const target = mode === "ar" ? 0.12 : mode === "xr" ? -0.72 : 0;
      pose.ry += target;
      pose.scale *= mode === "ar" ? 0.8 : 1;
    }
    if (new URLSearchParams(location.search).has("poster")) {
      pose.x = 0.5;
      pose.y = 0.47;
      pose.scale = 1.1;
      pose.ry = -0.5;
      pose.rx = 0.22;
      pose.rz = -0.1;
      pose.progress = 1.15;
      experience?.update(pose, 0, { x: 0, y: 0 }, true);
      return;
    }
    pose.progress = p;
    if (raw > 3.5 && raw < 6.5) {
      pose.view = view;
      pose.focus = smooth(3.5, 3.95, raw) * (1 - smooth(6.05, 6.5, raw));
    }
    const ink = inkMix[i](f);
    paintCta(i, f);
    html.style.setProperty("--stage-ink", ink);
    html.style.setProperty("--stage-muted", mutedMix[i](f));
    html.style.setProperty("--stage-line", pose.dark > 0.5 ? "#d6e4ff35" : "#1d1d1f23");
    $(".stage-wash").style.background = bgMix[i](f);
    $(".stage-grid").style.opacity = String(pose.dark * 0.5);
    const scaleNames = [
      "01 / OBJECT",
      "02 / OBJECT + TABLE",
      "03 / FURNISHED INTERIOR",
      "04 / APARTMENT BUILDING",
      "05 / NEIGHBOURHOOD",
      "06 / THE COMPLETE SCENE",
    ];
    const scaleNode = $("#scene-scale");
    if (scaleNode) scaleNode.textContent = scaleNames[Math.round(p)];
    const n = clamp(0, 5, Math.round(p));
    if (n !== chapter) {
      chapter = n;
      $("#current-chapter").textContent = twoDigits(n);
      $$(".chapter-nav button").forEach((b, j) => {
        b.classList.toggle("selected", j === n);
        if (j === n) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      });
    }
    $$(".story-panel").forEach((panel, j) => {
      const dist = Math.abs(p - j),
        alpha = 1 - smooth(0.25, 0.55, dist);
      panel.style.opacity = String(alpha);
      panel.style.visibility = alpha > 0.015 ? "visible" : "hidden";
      panel.style.transform = "translate3d(0," + (j - p) * 64 + "px,0)";
      panel.inert = alpha < 0.5;
      panel.setAttribute("aria-hidden", String(alpha < 0.5));
    });
    $(".rail-progress>i").style.transform = "scaleX(" + raw / 7 + ")";
    $(".ghost-type").style.opacity = String(1 - smooth(0, 0.8, p));
    $(".ghost-type").style.transform = "translate3d(" + -p * 15 + "%,0,0)";
    $$(".orbit").forEach((el) => (el.style.opacity = String(1 - smooth(0, 0.9, p))));
    $(".geometry-number").style.opacity = String((1 - smooth(0.25, 0.8, Math.abs(p - 1))) * 0.7);
    $(".geometry-number").style.transform = "translate3d(" + (p - 1) * 8 + "%,0,0)";
    $(".stream-line").style.opacity = String(1 - smooth(0.2, 0.85, Math.abs(p - 2)));
    $(".link-capsule").style.opacity = String(1 - smooth(0.2, 0.6, Math.abs(p - 3)));
    $(".device-frame").style.opacity = String(1 - smooth(0.25, 0.7, Math.abs(p - 4)));
    experience?.update(pose, t, pointer, paused);
  }
  const plugins = createPluginShowcase({ gsap, reduced });
  cleanups.push(() => plugins.dispose());
  const showcase = createShowcase({ gsap, ST, reduced });
  cleanups.push(() => showcase.dispose());
  const enhancements = createEnhancements({ gsap, ST, reduced, scrollToTarget });
  cleanups.push(() => enhancements.dispose());
  function onPage() {
    const ctx = gsap.context(() => {
      html.classList.add("story-ready");
      gsap.set(".story-panel", { autoAlpha: 0 });
      gsap.set(".hero-panel", { autoAlpha: 1 });
      gsap.from(".hero-panel .panel-copy", { y: 26, opacity: 0, duration: 1.1, ease: "expo.out", clearProps: "opacity,transform" });
      const tween = gsap.to(driver, {
        p: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-stage",
          start: "top top",
          end: () => "+=" + innerHeight * (innerWidth < 600 ? 7.4 : 8),
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      storyTrigger = tween.scrollTrigger;
      enhancements.mount();
      showcase.mount();
    });
    return () => ctx.revert();
  }
  async function init() {
    if (reduced || !gsap) {
      staticStory();
      return;
    }
    try {
      const mod = await import("./model.ts");
      experience = await mod.createExperience($("#stage-three"));
      html.classList.remove("static-story", "no-gl");
      html.classList.add("gl-ready");
    } catch (e) {
      console.warn("3D preview unavailable; using the static story.", e);
      staticStory();
      return;
    }
    if (innerWidth > 800) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: false });
      const smoothScroll = lenis;
      smoothScroll.on("scroll", ST.update);
      const lenisTick = (t: number) => smoothScroll.raf(t * 1000);
      gsap.ticker.add(lenisTick);
      cleanups.push(() => {
        gsap.ticker.remove(lenisTick);
        smoothScroll.destroy();
      });
      gsap.ticker.lagSmoothing(0);
    }
    if (new URLSearchParams(location.search).has("poster")) {
      html.classList.add("poster-capture");
      const posterTick = () => applyStory(0);
      gsap.ticker.add(posterTick);
      cleanups.push(() => gsap.ticker.remove(posterTick));
      applyStory(0);
      return;
    }
    cleanups.push(onPage());
    // Re-measure the pinned story when the window width changes: touch devices can skip ScrollTrigger's refresh,
    // leaving a gap beside the stage.
    let lastWidth = innerWidth,
      resizeTimer: ReturnType<typeof setTimeout> | 0 = 0;
    const onResize = () => {
      if (innerWidth === lastWidth) return;
      lastWidth = innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ST.refresh();
        lenis?.resize();
      }, 200);
    };
    addEventListener("resize", onResize);
    cleanups.push(() => {
      removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    });
    // Later sections can change height after the triggers were measured (fonts, charts, sections filling in);
    // re-measure so the pinned gallery doesn't start at a stale position.
    let layoutTimer: ReturnType<typeof setTimeout> | 0 = 0;
    const layout = new ResizeObserver(() => {
      clearTimeout(layoutTimer);
      layoutTimer = setTimeout(() => {
        ST.refresh();
        lenis?.resize();
      }, 150);
    });
    $$("#app-main > section:not(.story):not(.possibility-gallery)").forEach((s) => layout.observe(s));
    cleanups.push(() => {
      layout.disconnect();
      clearTimeout(layoutTimer);
    });
    const move = (e: PointerEvent) => {
      aim.x = e.clientX / innerWidth - 0.5;
      aim.y = e.clientY / innerHeight - 0.5;
    };
    if (matchMedia("(pointer:fine)").matches) {
      addEventListener("pointermove", move, { passive: true });
      cleanups.push(() => removeEventListener("pointermove", move));
    }
    const observer = new IntersectionObserver((e) => (visible = e[0].isIntersecting));
    observer.observe($(".story-stage"));
    cleanups.push(() => observer.disconnect());
    const tick = (t: number) => {
      if (!visible || document.hidden) return;
      const k = 1 - Math.pow(0.93, gsap.ticker.deltaRatio());
      pointer.x += (aim.x - pointer.x) * k;
      pointer.y += (aim.y - pointer.y) * k;
      applyStory(t);
    };
    gsap.ticker.add(tick);
    cleanups.push(() => gsap.ticker.remove(tick));
    applyStory(0);
    document.fonts.ready.then(() => {
      ST.refresh();
      lenis?.resize();
      if (location.hash && $(location.hash) && !location.hash.startsWith("#chapter")) scrollToTarget(location.hash, true);
    });
  }
  init().catch(() => staticStory());
  return function dispose() {
    clearTimeout(fallbackTimer);
    cleanups.forEach((fn) => fn());
    experience?.dispose();
    html.classList.remove("js", "reduced-motion", "story-ready", "gl-ready", "static-story", "no-gl", "poster-capture");
    ["--stage-ink", "--stage-muted", "--stage-line"].forEach((p) => html.style.removeProperty(p));
    ST.getAll().forEach((t) => t.kill());
  };
}
