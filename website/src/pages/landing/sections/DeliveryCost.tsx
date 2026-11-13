// Home page: cost section.
import { costHeading, costScale } from "../data.ts";
import { SectionHead } from "../parts.tsx";

export default function DeliveryCost() {
  return (
    <section className="mx-cost section-pad" id="cost" aria-labelledby="cost-heading">
      <SectionHead heading={costHeading} />
      <div className="mx-calc" data-calc="">
        <div className="mx-calc-input">
          <label htmlFor="calc-hours">Viewer-hours a month</label>
          <output data-calc-hours="">10,000</output>
          <input id="calc-hours" type="range" min="0" max="300" step="1" defaultValue="100" data-calc-range="" />
          <div className="mx-calc-scale">
            {costScale.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p>A viewer-hour is one person exploring a scene for an hour. 10,000 is about 2,000 buyers spending five minutes each, every day of the month.</p>
        </div>
        <div className="mx-calc-out">
          <div className="mx-calc-row us">
            <span>Verse Engine</span>
            <div className="mx-calc-track">
              <i data-calc-bar-us="" />
            </div>
            <strong data-calc-us="">≤ $2,520</strong>
          </div>
          <div className="mx-calc-row">
            <span>Cloud GPU streaming</span>
            <div className="mx-calc-track">
              <i data-calc-bar-gpu="" />
            </div>
            <strong data-calc-gpu="">$4,980–$60,000</strong>
          </div>
          <div className="mx-calc-save">
            <small>Cheaper to deliver, at least</small>
            <strong data-calc-save="">$2,460 / month</strong>
          </div>
        </div>
      </div>
      <p className="mx-credit">
        Delivery cost to serve the scene: Verse at most about $252 per thousand viewer-hours; cloud GPU streaming $498–$6,000. Your plan price is separate, and
        starts free.
      </p>
    </section>
  );
}
