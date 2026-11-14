// Home page: engine section.
import { engineHeading, engineLayers, techniques } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";
import { stepNumber } from "../../../utils/format.ts";
import { useState } from "react";
import { useHomeButtonIds } from "../button-ids.ts";

export default function Engine() {
  const ids = useHomeButtonIds(),
    // the selected technique: on phones its card sits right under it (the card's place in the column follows it)
    [sel, setSel] = useState(0);
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
            <button key={t.title} id={ids.engine?.[i]} {...tab(i)} aria-selected={i === sel} onClick={() => setSel(i)} style={{ order: i * 2 }} data-t={i}>
              <span>{stepNumber(i)}</span>
              {t.title}
            </button>
          ))}
        </div>
        <div className="mx-tech-view" role="tabpanel" aria-live="polite" style={{ order: sel * 2 + 1 }}>
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
