// Home page: engine section.
import { engineHeading, engineLayers, techniques } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";
import { stepNumber } from "../../../utils/format.ts";

export default function Engine() {
  return (
    <section className="mx-engine section-pad" id="engine" aria-labelledby="engine-heading">
      <SectionHead heading={engineHeading} />
      <div className="mx-layers" data-layers="">
        {engineLayers.map((l) => (
          <article key={l.label} className="mx-layer">
            <span>{l.label}</span>
            <h3>{l.title}</h3>
            <p>{l.text}</p>
          </article>
        ))}
      </div>
      <div className="mx-tech" data-tech="">
        <div className="mx-tech-list" role="tablist" aria-label="Nine techniques">
          {techniques.map((t, i) => (
            <button key={t.title} id={t.id} {...tab(i)} data-t={i}>
              <span>{stepNumber(i)}</span>
              {t.title}
            </button>
          ))}
        </div>
        <div className="mx-tech-view" role="tabpanel" aria-live="polite">
          <span className="mx-tech-n" data-tech-n="">
            {stepNumber(0)}
          </span>
          <h3 data-tech-title="">{techniques[0].title}</h3>
          <p data-tech-copy="">{techniques[0].text}</p>
          <canvas className="mx-tech-canvas" data-tech-canvas="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
