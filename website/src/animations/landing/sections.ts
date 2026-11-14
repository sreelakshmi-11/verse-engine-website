// Behaviour for the home page sections after the scroll story: Lyon views, squares scan, ways to create, engine
// layers, benchmarks, developer console, proof wall, race, try it live, cost calculator and countdown.
// mount() returns dispose, which stops the timers, observers and listeners.
import qrcode from "qrcode-generator";
import { lyonViews, createRoutes, techniques, benchMeasures } from "../../pages/landing/data.ts";
import { copyText } from "../../utils/clipboard.ts";
import { stepNumber, twoDigits } from "../../utils/format.ts";

export function mount() {
  // Look-ups in the home page markup; a section that may be missing is checked where it is first looked up.
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)!;
  const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("motion-off");

  type Timer = ReturnType<typeof setTimeout>;
  const cleanups: (() => void)[] = [];
  const timeouts = new Set<Timer>(),
    intervals = new Set<ReturnType<typeof setInterval>>(),
    frames = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
    return id;
  };
  const every = (fn: () => void, ms: number) => {
    const id = setInterval(fn, ms);
    intervals.add(id);
    return id;
  };
  const stopEvery = (id: ReturnType<typeof setInterval> | undefined) => {
    clearInterval(id);
    if (id !== undefined) intervals.delete(id);
  };
  const frame = (fn: (t: number) => void) => {
    const id = requestAnimationFrame((t) => {
      frames.delete(id);
      fn(t);
    });
    frames.add(id);
  };
  const on = (el: EventTarget, type: string, fn: () => void) => {
    el.addEventListener(type, fn);
    cleanups.push(() => el.removeEventListener(type, fn));
  };

  function tabs(buttons: HTMLElement[], onSelect: (i: number, b: HTMLElement, user: boolean) => void) {
    buttons.forEach((b, i) =>
      on(b, "click", () => {
        buttons.forEach((o) => o.setAttribute("aria-selected", String(o === b)));
        onSelect(i, b, true);
      }),
    );
  }
  function inView(el: Element, cb: () => void, threshold = 0.25) {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            cb();
            io.disconnect();
          }
        }),
      { threshold },
    );
    io.observe(el);
    cleanups.push(() => io.disconnect());
  }

  // Copy the sample scene link in the workflow card
  const copyScene = $("[data-copy-scene]");
  if (copyScene)
    on(copyScene, "click", () => {
      const fb = $(".share-feedback");
      const done = () => {
        if (fb) {
          fb.textContent = "Link copied";
          later(() => (fb.textContent = ""), 1800);
        }
      };
      copyText("https://verse.ctruh.com/s/your-scene").then(done);
    });

  // Lyon views
  const lyon = $("[data-lyon]");
  if (lyon) {
    const imgs = $$(".mx-lyon-views img", lyon);
    const fig = $("[data-lyon-fig]", lyon),
      note = $("[data-lyon-note]", lyon);
    tabs($$("[data-view]", lyon), (i: number) => {
      imgs.forEach((im, k) => im.classList.toggle("on", k === i));
      fig.replaceChildren(document.createTextNode(lyonViews[i].fig), Object.assign(document.createElement("span"), { textContent: lyonViews[i].unit }));
      note.textContent = lyonViews[i].note;
    });
  }

  // 2,000 squares, one lit, with a scan when it scrolls into view
  const sq = $("[data-squares]");
  if (sq) {
    const LIT = 1137,
      frag = document.createDocumentFragment();
    sq.replaceChildren();
    for (let i = 0; i < 2000; i++) {
      const c = document.createElement("i");
      if (i === LIT) c.className = "lit";
      frag.appendChild(c);
    }
    sq.appendChild(frag);
    if (!reduced)
      inView(sq, () => {
        const cells = sq.children;
        sq.classList.add("scan");
        let col = 0;
        const t = every(() => {
          for (let r = 0; r < 40; r++) {
            const p = cells[r * 50 + col - 3];
            if (p) p.classList.remove("hot");
            const c = cells[r * 50 + col];
            if (c) c.classList.add("hot");
          }
          if (++col > 53) {
            stopEvery(t);
            sq.classList.remove("scan");
          }
        }, 28);
      });
  }

  // Ways to create
  const create = $("[data-create]");
  if (create) {
    const imgs = $$(".mx-create-stage img", create);
    const btns = $$("[data-route]", create);
    let cur = 0,
      timer: ReturnType<typeof setInterval> | undefined;
    const show = (i: number) => {
      cur = i;
      imgs.forEach((im, k) => im.classList.toggle("on", k === i));
      btns.forEach((b, k) => {
        b.setAttribute("aria-selected", String(k === i));
        const bar = b.querySelector<HTMLElement>("i")!;
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animation = "";
      });
      $("[data-route-in]", create).textContent = createRoutes[i].input;
      $("[data-route-out]", create).textContent = createRoutes[i].output;
      $("[data-route-tag]", create).textContent = createRoutes[i].tag;
    };
    tabs(btns, (i: number) => {
      show(i);
      create.classList.add("held");
      stopEvery(timer);
    });
    if (!reduced)
      inView(create, () => {
        timer = every(() => show((cur + 1) % createRoutes.length), 5500);
      });
    else create.classList.add("held");
  }

  // Engine layers spread apart on view; nine techniques with a small live drawing
  const layers = $("[data-layers]");
  if (layers) inView(layers, () => layers.classList.add("open"), 0.4);
  const tech = $("[data-tech]");
  if (tech) {
    let mode = 0;
    tabs($$("[data-t]", tech), (i: number) => {
      mode = i;
      $("[data-tech-n]", tech).textContent = stepNumber(i);
      $("[data-tech-title]", tech).textContent = techniques[i].title;
      $("[data-tech-copy]", tech).textContent = techniques[i].text;
    });
    // A field of points; a sweeping view cone lights the ones it sees, denser near the centre.
    const cv = $<HTMLCanvasElement>("[data-tech-canvas]", tech),
      ctx = cv.getContext("2d")!;
    let w = 0,
      h = 0,
      pts: [number, number, number][] = [],
      visible = false;
    const t0 = performance.now();
    const size = () => {
      const r = cv.getBoundingClientRect(),
        d = Math.min(2, devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      cv.width = w * d;
      cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      pts = [];
      const step = 14;
      for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) pts.push([x, y, Math.random()]);
    };
    const draw = (now: number) => {
      if (!visible) return;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w * (0.5 + 0.32 * Math.sin(t * 0.45 + mode)),
        cy = h * 1.05,
        ang = -Math.PI / 2 + 0.35 * Math.sin(t * 0.6),
        spread = 0.62 + 0.08 * (mode % 3);
      for (const [x, y, r] of pts) {
        const dx = x - cx,
          dy = y - cy,
          a = Math.atan2(dy, dx),
          dist = Math.hypot(dx, dy);
        const inCone = Math.abs(a - ang) < spread && dist < h * 1.15;
        const lod = inCone ? 1 - dist / (h * 1.2) : 0;
        ctx.fillStyle = inCone ? `rgba(0,102,204,${0.3 + 0.7 * lod})` : "rgba(29,29,31,0.16)";
        const s = inCone ? 1.6 + 3 * lod : 1.4;
        if (mode === 7 && inCone && r > 0.92) ctx.fillStyle = "rgba(31,138,76,0.9)";
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      if (!reduced) frame(draw);
    };
    size();
    on(window, "resize", size);
    const io = new IntersectionObserver((es) =>
      es.forEach((e) => {
        visible = e.isIntersecting;
        if (visible) frame(draw);
      }),
    );
    io.observe(cv);
    cleanups.push(() => io.disconnect());
  }

  // Benchmarks: bars drawn to one scale per measure
  const bench = $("[data-bench]");
  if (bench) {
    const bars = $$(".mx-bar", bench);
    const render = (i: number) => {
      const m = benchMeasures[i];
      $("[data-bench-q]", bench).textContent = m.question;
      $("[data-bench-verdict]", bench).replaceChildren(
        Object.assign(document.createElement("strong"), { textContent: m.verdict.strong }),
        document.createTextNode(m.verdict.text),
      );
      bars.forEach((bar, k) => {
        const row = m.rows[k],
          fill = bar.querySelector<HTMLElement>("i")!,
          val = bar.querySelector("b")!;
        bar.classList.toggle("na", !row);
        bar.classList.toggle("winner", k === m.win);
        if (!row) {
          val.textContent = "Not compared";
          fill.style.left = "0";
          fill.style.width = "100%";
          return;
        }
        const [lo, hi, label] = row,
          isRange = hi > lo;
        fill.style.left = isRange ? (lo / m.max) * 100 + "%" : "0";
        fill.style.width = Math.max(1.5, ((isRange ? hi - lo : hi) / m.max) * 100) + "%";
        val.textContent = label;
      });
    };
    tabs($$("[data-m]", bench), render);
    bars.forEach((b) => {
      b.querySelector<HTMLElement>("i")!.style.width = "0";
    });
    inView(bench, () => render(0), 0.3);
  }

  // Developer console
  const dev = $("[data-dev]");
  if (dev) {
    const panes = $$("[data-pane]", dev);
    let current = "embed";
    tabs($$("[data-code]", dev), (_: number, b: HTMLElement) => {
      current = b.dataset.code!;
      panes.forEach((p) => (p.hidden = p.dataset.pane !== current));
    });
    const copy = $("[data-copy-code]", dev);
    if (copy)
      on(copy, "click", () => {
        const text = $(`[data-pane="${current}"]`, dev).textContent ?? "";
        const done = (ok: boolean) => {
          copy.textContent = ok ? "Copied" : "Select to copy";
          later(() => (copy.textContent = "Copy"), 1600);
        };
        copyText(text).then(done);
      });
  }

  // Proof wall: count up once on view; tap toggles the "how measured" note on touch screens
  const proof = $(".mx-proof-grid");
  if (proof) {
    $$(".mx-stat", proof).forEach((b) => on(b, "click", () => b.classList.toggle("on")));
    const nums = $$("[data-count]", proof);
    // Real values stay in the markup; the count only runs once triggered and always lands on them.
    const settle = () => nums.forEach((n) => (n.textContent = Number(n.dataset.count).toFixed(Number(n.dataset.dec))));
    if (!reduced)
      inView(
        proof,
        () => {
          const start = performance.now(),
            dur = 1200;
          const tick = () => {
            const p = Math.min(1, (performance.now() - start) / dur),
              e = 1 - Math.pow(1 - p, 3);
            nums.forEach((n) => (n.textContent = (Number(n.dataset.count) * e).toFixed(Number(n.dataset.dec))));
            if (p < 1) frame(tick);
            else settle();
          };
          frame(tick);
          later(settle, dur + 300);
        },
        0.05,
      );
  }

  // Old way vs one link: Verse finishes while the old pipeline is still on step two
  const race = $("[data-race]");
  if (race) {
    const oldSteps = $$(".mx-lane.old li", race),
      newSteps = $$(".mx-lane.new li", race);
    const oldBar = $(".mx-lane.old .mx-lane-bar i", race),
      newBar = $(".mx-lane.new .mx-lane-bar i", race);
    const oldStatus = $("[data-race-old-status]", race),
      newStatus = $("[data-race-new-status]", race);
    let timers: Timer[] = [];
    const run = () => {
      timers.forEach((id) => {
        clearTimeout(id);
        timeouts.delete(id);
      });
      timers = [];
      [...oldSteps, ...newSteps].forEach((li) => li.classList.remove("done"));
      oldBar.style.width = newBar.style.width = "0";
      oldStatus.textContent = "Working…";
      newStatus.textContent = "Uploading…";
      const at = (ms: number, fn: () => void) => timers.push(later(fn, reduced ? 0 : ms));
      newSteps.forEach((li, i) =>
        at(400 + i * 650, () => {
          li.classList.add("done");
          newBar.style.width = ((i + 1) / newSteps.length) * 100 + "%";
        }),
      );
      at(400 + newSteps.length * 650, () => {
        newStatus.textContent = "Link live · 45 s";
      });
      oldSteps.forEach((li, i) =>
        at(900 + i * 1500, () => {
          li.classList.add("done");
          oldBar.style.width = ((i + 1) / oldSteps.length) * 100 + "%";
          oldStatus.textContent = i < oldSteps.length - 1 ? "Still building…" : "Shipped, behind an install";
        }),
      );
    };
    const replay = $("[data-race-replay]", race);
    if (replay) on(replay, "click", run);
    inView(race, run, 0.35);
  }

  // Try it live: switch scene, refresh the QR code and the open link
  const tryit = $("[data-try]");
  if (tryit) {
    const stage = $(".mx-try-stage", tryit),
      img = $<HTMLImageElement>("[data-try-img]", tryit),
      qr = $("[data-qr]", tryit);
    const open = $<HTMLAnchorElement>("[data-try-open]", tryit),
      url = $("[data-try-url]", tryit);
    const drawQR = (href: string) => {
      const q = qrcode(0, "M");
      q.addData(href);
      q.make();
      qr.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    };
    const show = (b: HTMLElement | null) => {
      if (!b) return;
      const href = b.dataset.scene!;
      open.href = href;
      if (b.dataset.openId)
        open.id = b.dataset.openId; // each scene's link has its own id
      else open.removeAttribute("id");
      url.textContent = href.replace("https://", "");
      stage.classList.toggle("no-img", !b.dataset.img);
      if (b.dataset.img) img.src = b.dataset.img;
      drawQR(href);
    };
    tabs($$("[data-scene]", tryit), (_: number, b: HTMLElement) => show(b));
    show(tryit.querySelector<HTMLElement>('[data-scene][aria-selected="true"]'));
  }

  // Delivery cost calculator: log slider from 1K to 1M viewer-hours
  const calc = $("[data-calc]");
  if (calc) {
    const range = $<HTMLInputElement>("[data-calc-range]", calc);
    const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
    const update = () => {
      const hrs = Math.round(1000 * Math.pow(10, Number(range.value) / 100));
      const k = hrs / 1000,
        us = 252 * k,
        lo = 498 * k,
        hi = 6000 * k;
      $("[data-calc-hours]", calc).textContent = hrs.toLocaleString("en-US");
      $("[data-calc-us]", calc).textContent = "≤ " + money(us);
      $("[data-calc-gpu]", calc).textContent = money(lo) + "–" + money(hi);
      $("[data-calc-save]", calc).textContent = money(lo - us) + " / month";
      const barUs = $("[data-calc-bar-us]", calc),
        barGpu = $("[data-calc-bar-gpu]", calc);
      barUs.style.width = Math.max(1.5, (us / hi) * 100) + "%";
      barGpu.style.left = (lo / hi) * 100 + "%";
      barGpu.style.width = 100 - (lo / hi) * 100 + "%";
    };
    on(range, "input", update);
    update();
  }

  // Launch film: plays muted while on screen (unless reduced motion), loops and pauses off screen; the centre
  // icon toggles it. The 720p file is used up to 800 px wide.
  const film = $("[data-film]");
  if (film) {
    const v = film.querySelector("video")!,
      play = $("[data-film-play]", film);
    let wanted = !reduced; // whether the film should play when it is on screen
    v.muted = true;
    const sync = () => {
      film.dataset.state = v.paused ? "paused" : "playing"; // CSS shows the play or pause icon
      play.setAttribute("aria-label", v.paused ? "Play the film" : "Pause the film");
    };
    on(play, "click", () => {
      wanted = v.paused;
      if (v.paused) v.play().catch(() => {});
      else v.pause();
    });
    ["play", "pause"].forEach((type) => on(v, type, sync));
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            if (wanted) v.play().catch(() => {});
          } else if (!v.paused) v.pause();
        }),
      { threshold: 0.35 },
    );
    io.observe(film);
    cleanups.push(() => {
      io.disconnect();
      v.pause();
    });
    sync();
  }

  // Launch countdown: 16 Nov 2026, 3:30 PM IST
  const kicker = $(".hero-kicker");
  if (kicker) {
    const launch = Date.UTC(2026, 10, 16, 10, 0);
    const pill = Object.assign(document.createElement("span"), { className: "mx-launch" });
    pill.innerHTML = "<i></i><b></b>";
    kicker.appendChild(pill);
    cleanups.push(() => pill.remove());
    const tick = () => {
      const d = launch - Date.now();
      if (d <= 0) {
        pill.lastChild!.textContent = "Live now";
        return;
      }
      const days = Math.floor(d / 864e5),
        h = Math.floor(d / 36e5) % 24,
        m = Math.floor(d / 6e4) % 60;
      pill.lastChild!.textContent = `Live 16 Nov · ${days}d ${h}h ${twoDigits(m)}m`;
      later(tick, 30000);
    };
    tick();
  }

  return () => {
    cleanups.forEach((fn) => fn());
    timeouts.forEach((id) => clearTimeout(id));
    intervals.forEach((id) => clearInterval(id));
    frames.forEach((id) => cancelAnimationFrame(id));
  };
}
