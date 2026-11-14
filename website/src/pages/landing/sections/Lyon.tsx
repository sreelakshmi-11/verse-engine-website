// Home page: lyon section.
import { lyonHeading, lyonViews, lyonSquaresLegend, lyonStops } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";

export default function Lyon() {
  return (
    <section className="mx-lyon" id="lyon" aria-labelledby="lyon-heading">
      <div className="mx-inner">
        <SectionHead heading={lyonHeading} />
        <div className="mx-lyon-stage" data-lyon="">
          <div className="mx-lyon-views">
            {lyonViews.map((v, i) => (
              <img
                key={v.src}
                className={i === 0 ? "on" : undefined}
                src={v.src}
                alt={v.alt}
                width={v.width}
                height={v.height}
                loading={i === 0 ? undefined : "lazy"}
              />
            ))}
          </div>
          <div className="mx-lyon-hud">
            <span className="mx-live">
              <i />
              LIVE · CHROME · NO APP
            </span>
            <span className="mx-lyon-url">
              verse.ctruh.com/s/
              <strong>lyon</strong>
            </span>
          </div>
          <div className="mx-lyon-panel">
            <div className="mx-lyon-read">
              <strong data-lyon-fig="">
                {lyonViews[0].fig}
                <span>{lyonViews[0].unit}</span>
              </strong>
              <small data-lyon-note="">{lyonViews[0].note}</small>
            </div>
            <div className="mx-lyon-tabs" role="tablist" aria-label="Lyon views">
              {lyonViews.map((v, i) => (
                <button key={v.tab} {...tab(i)} data-view={i}>
                  {v.tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-lyon-grid">
          <figure className="mx-squares-card">
            <div
              className="mx-squares"
              data-squares=""
              role="img"
              aria-label="2,000 squares stand for the 556 GB file; one lit square is what it takes to show the whole city"
            />
            <figcaption>
              {lyonSquaresLegend.map((l) => (
                <span key={l.label}>
                  <b className={l.lit ? "lit" : undefined}>{l.label}</b>
                  {l.text}
                </span>
              ))}
            </figcaption>
          </figure>
          <div className="mx-lyon-copy">
            <span className="section-number">WHY IT OPENS AT ALL</span>
            <h3>
              The file stays put.
              <br />
              <span>The view comes to you.</span>
            </h3>
            <p>
              {
                "Instead of sending the whole file, Verse streams only the part you are looking at, in the detail your screen can show. Showing all of Lyon takes about "
              }
              <strong data-count="0.05" data-dec="2">
                0.05
              </strong>
              % of the file. The rest streams as you move.
            </p>
            <ul className="mx-stops">
              {lyonStops.map((s) => (
                <li key={s.label}>
                  <b>{s.label}</b>
                  {s.text}
                </li>
              ))}
            </ul>
            <p className="mx-claim">We know of no other engine that streams a real, non-repeating scene of this size from a single file.</p>
          </div>
        </div>
        <p className="mx-credit">
          Stills from a screen recording of the engine running live. City data: Métropole de Lyon, 2023 photomesh, Licence Ouverte 2.0.
        </p>
      </div>
    </section>
  );
}
