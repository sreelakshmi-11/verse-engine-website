// Home page: pricing section.
import { pricingHeading, plans, contactUrl } from "../data.ts";
import { SectionHead } from "../parts.tsx";
import { useHomeButtonIds } from "../button-ids.ts";

export default function Pricing() {
  const ids = useHomeButtonIds();
  return (
    <section className="mx-pricing section-pad" id="pricing" aria-labelledby="pricing-heading">
      <SectionHead heading={pricingHeading} />
      <div className="mx-plans">
        {plans.map((p) => (
          <article key={p.name} className={p.className ? `mx-plan ${p.className}` : "mx-plan"}>
            <h3>
              {p.badge ? `${p.name} ` : p.name}
              {p.badge && <em>{p.badge}</em>}
            </h3>
            <strong>
              {p.from && <small>{"from "}</small>}
              {p.price}
              {p.monthly && <small>/mo</small>}
            </strong>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="mx-pricing-foot">
        <a className="button action" href="/pricing" id={ids.pricingCompare}>
          <span>Compare plans</span>
        </a>
        <a className="under-link" href={contactUrl} id={ids.pricingTalk}>
          Talk to us
        </a>
      </div>
    </section>
  );
}
