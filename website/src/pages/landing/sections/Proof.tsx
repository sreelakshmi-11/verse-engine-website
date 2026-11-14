// Home page: proof section.
import { proofHeading, proofStats } from "../data.ts";
import { SectionHead } from "../parts.tsx";

export default function Proof() {
  return (
    <section className="mx-proof section-pad" id="proof" aria-labelledby="proof-heading">
      <SectionHead heading={proofHeading} />
      <div className="mx-proof-grid">
        {proofStats.map((s) => (
          <button key={s.label} className="mx-stat" type="button">
            <strong>
              {s.prefix || null}
              <span data-count={s.count} data-dec={s.dec}>
                {s.count}
              </span>
              {s.suffix || null}
            </strong>
            <em>{s.label}</em>
            <small>{s.note}</small>
          </button>
        ))}
      </div>
      <p className="mx-credit">
        {"Desktop browser benchmarks unless noted. Results vary with scene, device and connection. "}
        <a className="inline-link" href="/docs/how-we-measure">
          How we measure ↗
        </a>
      </p>
    </section>
  );
}
