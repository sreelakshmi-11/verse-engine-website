// Home page: story section.
import { Fragment } from "react";
import { heroAside, realityModes, storyChapters, chapterNav } from "../data.ts";
import type { StoryChapter as StoryChapterData } from "../data.ts";
import { Lines, tab } from "../parts.tsx";
import { twoDigits } from "../../../utils/format.ts";

function StoryChapter({ c }: { c: StoryChapterData }) {
  return (
    <article className={`story-panel ${c.className}`} id={`chapter-${c.chapter}`} data-chapter={c.chapter}>
      <div className="panel-copy">
        <p className="chapter-label">{c.label}</p>
        <h2>
          <Lines lines={c.title} />
        </h2>
        <p id={c.bodyId}>
          <Lines lines={c.body} />
        </p>
        {c.stat && (
          <div className="inline-stat">
            <strong>{c.stat.value}</strong>
            <span>{c.stat.label}</span>
          </div>
        )}
        {c.note && (
          <small className="benchmark-note">
            {c.note.text}
            <a href={c.note.link.href} id={c.note.link.id}>
              {c.note.link.label}
            </a>
            <br />
            {c.note.after}
          </small>
        )}
        {c.features && (
          <div className="link-features">
            {c.features.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        )}
        {c.modes && (
          <>
            <div className="reality-tabs" role="tablist" aria-label="Experience types">
              {realityModes.map((m, i) => (
                <button key={m.mode} {...tab(i)} id={`mode-${m.mode}`} aria-controls="mode-description" data-mode={m.mode} tabIndex={i === 0 ? undefined : -1}>
                  {m.label}
                </button>
              ))}
            </div>
            <div id="mode-description" role="tabpanel" aria-labelledby={`mode-${realityModes[0].mode}`}>
              {realityModes[0].note}
            </div>
          </>
        )}
        {c.cta && (
          <>
            <a className="button action" href={c.cta.button.href} id={c.cta.button.id}>
              <span>{c.cta.button.label}</span>
            </a>
            <a className="under-link" href={c.cta.link.href} id={c.cta.link.id}>
              {c.cta.link.label}
            </a>
          </>
        )}
      </div>
      {c.callout && (
        <div className="detail-callout">
          <span>{c.callout.mark}</span>
          <p>{c.callout.text}</p>
          <small>{c.callout.small}</small>
        </div>
      )}
      {c.meta && (
        <div className="stream-meta">
          <span className="live-dot" />
          {c.meta.text}
          <span className="data-bits">{c.meta.bits}</span>
        </div>
      )}
      {c.workflow && (
        <div className="link-workflow">
          {c.workflow.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && <i>→</i>}
              <span>{step}</span>
            </Fragment>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Story() {
  return (
    <section className="story" id="story" aria-label="From a 3D model to every reality">
      <div className="story-stage">
        <div className="stage-wash" aria-hidden="true" />
        <div className="stage-grid" aria-hidden="true" />
        <div className="ghost-type" aria-hidden="true">
          VERSE
        </div>
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="stage-three" id="stage-three" aria-hidden="true" />
        <div className="scene-scale" id="scene-scale" aria-hidden="true">
          01 / OBJECT
        </div>
        <img
          className="headset-poster"
          alt="Vertex point-cloud study of an object, table and furnished space"
          width="1000"
          height="800"
          fetchPriority="high"
          src="/assets/point-world-poster.svg"
        />
        <div className="geometry-number" aria-hidden="true">
          10.3
          <span>B</span>
        </div>
        <div className="stream-line" aria-hidden="true" />
        <div className="device-frame" data-mode="web" aria-hidden="true">
          <svg className="device-morph" viewBox="0 0 720 420" fill="none">
            <defs>
              <path data-outline="web" d="M80 80C80 62 95 50 115 50H605C625 50 640 62 640 80V340C640 358 625 370 605 370H115C95 370 80 358 80 340Z" />
              <path data-outline="ar" d="M260 40C260 23 274 14 290 14H430C446 14 460 23 460 40V382C460 399 446 408 430 408H290C274 408 260 399 260 382Z" />
              <path
                data-outline="xr"
                d="M105 133C119 81 236 76 360 76S601 81 615 133L641 280C650 337 622 374 564 379L460 384C427 385 408 364 394 341C378 314 342 314 326 341C312 364 293 385 260 384L156 379C98 374 70 337 79 280Z"
              />
            </defs>
            <path
              className="device-outline"
              stroke="currentColor"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              d="M80.00,80.00L82.95,67.12L91.51,57.06L103.51,51.44L116.72,50.00L130.05,50.00L143.38,50.00L156.71,50.00L170.04,50.00L183.37,50.00L196.70,50.00L210.04,50.00L223.37,50.00L236.70,50.00L250.03,50.00L263.36,50.00L276.69,50.00L290.03,50.00L303.36,50.00L316.69,50.00L330.02,50.00L343.35,50.00L356.68,50.00L370.02,50.00L383.35,50.00L396.68,50.00L410.01,50.00L423.34,50.00L436.67,50.00L450.01,50.00L463.34,50.00L476.67,50.00L490.00,50.00L503.33,50.00L516.66,50.00L529.99,50.00L543.33,50.00L556.66,50.00L569.99,50.00L583.32,50.00L596.65,50.00L609.98,50.26L622.79,53.70L633.39,61.61L639.29,73.42L640.00,86.70L640.00,100.03L640.00,113.36L640.00,126.69L640.00,140.03L640.00,153.36L640.00,166.69L640.00,180.02L640.00,193.35L640.00,206.68L640.00,220.02L640.00,233.35L640.00,246.68L640.00,260.01L640.00,273.34L640.00,286.67L640.00,300.01L640.00,313.34L640.00,326.67L640.00,340.00L637.05,352.88L628.49,362.94L616.49,368.56L603.28,370.00L589.95,370.00L576.62,370.00L563.29,370.00L549.96,370.00L536.63,370.00L523.30,370.00L509.96,370.00L496.63,370.00L483.30,370.00L469.97,370.00L456.64,370.00L443.31,370.00L429.97,370.00L416.64,370.00L403.31,370.00L389.98,370.00L376.65,370.00L363.32,370.00L349.98,370.00L336.65,370.00L323.32,370.00L309.99,370.00L296.66,370.00L283.33,370.00L269.99,370.00L256.66,370.00L243.33,370.00L230.00,370.00L216.67,370.00L203.34,370.00L190.01,370.00L176.67,370.00L163.34,370.00L150.01,370.00L136.68,370.00L123.35,370.00L110.02,369.74L97.21,366.30L86.61,358.39L80.71,346.58L80.00,333.30L80.00,319.97L80.00,306.64L80.00,293.31L80.00,279.97L80.00,266.64L80.00,253.31L80.00,239.98L80.00,226.65L80.00,213.32L80.00,199.98L80.00,186.65L80.00,173.32L80.00,159.99L80.00,146.66L80.00,133.33L80.00,119.99L80.00,106.66L80.00,93.33Z"
            />
            <g data-chrome="web">
              <path d="M81 97H639" stroke="currentColor" opacity=".4" />
              <circle cx="111" cy="74" r="3" fill="currentColor" />
              <circle cx="126" cy="74" r="3" fill="currentColor" />
              <circle cx="141" cy="74" r="3" fill="currentColor" />
              <text x="360" y="78" textAnchor="middle" fill="currentColor">
                verse.ctruh.com / your-scene
              </text>
            </g>
            <g data-chrome="ar">
              <path d="M331 29H389M337 393H383" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M282 110V89H303M417 89H438V110M282 312V333H303M417 333H438V312" stroke="currentColor" opacity=".45" />
            </g>
            <g data-chrome="xr">
              <path d="M111 151C119 45 227 24 360 24S601 45 609 151" stroke="currentColor" strokeWidth="20" opacity=".24" />
              <path
                d="M130 151C147 115 246 114 360 114S573 115 590 151L611 268C617 303 599 331 561 335L469 340C430 342 412 297 360 297S290 342 251 340L159 335C121 331 103 303 109 268Z"
                stroke="currentColor"
                opacity=".35"
              />
              <ellipse cx="240" cy="221" rx="86" ry="65" stroke="currentColor" opacity=".15" />
              <ellipse cx="480" cy="221" rx="86" ry="65" stroke="currentColor" opacity=".15" />
            </g>
          </svg>
          <span className="device-status">WEB 3D · BROWSER</span>
        </div>
        <div className="link-capsule" aria-hidden="true">
          <span>
            verse.ctruh.com/s/
            <strong>your-world</strong>
          </span>
          <span className="link-check">✓</span>
        </div>
        <article className="story-panel hero-panel" id="chapter-0" data-chapter="0">
          <div className="panel-copy">
            <span className="hero-kicker">
              <span />
              Verse Engine by Ctruh · the streaming layer for 3D
            </span>
            <h1>
              <span className="hero-display">
                <span>Any 3D.</span>
                <br />
                <span>One link.</span>
              </span>
            </h1>
            <p className="hero-description">
              From a product to a whole city. Turn any 3D file, scan, floor plan or Blender, Unity or Unreal project into one link that opens in the browser on
              phones, laptops and headsets. No app. No download.
            </p>
            <a className="button action" href="/studio" id="lnk-explore-verse-engine-2">
              <span>Try it free</span>
            </a>
            <div className="hero-aside">
              {heroAside.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="object-annotation">
            <span className="annotation-line" />
            <p>
              One scene.
              <br />
              <strong>Infinite possibilities.</strong>
            </p>
            <small>Product → interior → city</small>
          </div>
          <a className="scroll-invitation" href="#chapter-1" data-jump="1" id="lnk-scroll-to-cross-the-boundary">
            <span className="scroll-track">
              <i />
            </span>
            {"Scroll to cross the boundary "}
            <span>↓</span>
          </a>
        </article>
        {storyChapters.map((c) => (
          <StoryChapter key={c.chapter} c={c} />
        ))}
        <a className="button action story-cta" href="/studio" id="lnk-explore-verse-engine-4">
          <span>Try it free</span>
        </a>
        <div className="story-rail">
          <div className="rail-index">
            <span id="current-chapter">00</span>
            <span>{`/ ${twoDigits(chapterNav.length - 1)}`}</span>
          </div>
          <div className="rail-progress">
            <i />
          </div>
          <nav className="chapter-nav" aria-label="Story chapters" id="nav-story-chapters">
            {chapterNav.map((c, i) => (
              <button
                key={c.id}
                className={i === 0 ? "selected" : undefined}
                data-jump={i}
                aria-label={c.aria}
                aria-current={i === 0 ? "step" : undefined}
                id={c.id}
              >
                <span>{c.label}</span>
              </button>
            ))}
          </nav>
          <button className="motion-toggle" aria-label="Pause ambient animation" aria-pressed="false" id="btn-pause-ambient-animation">
            <span>Ⅱ</span>
            <small>Pause motion</small>
          </button>
        </div>
      </div>
    </section>
  );
}
