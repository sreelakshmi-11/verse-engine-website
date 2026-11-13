// Home page: sec-faq-section section.
import { faqs } from "../data.ts";

export default function Faq() {
  return (
    <section className="faq-section section-pad" id="sec-faq-section">
      <div>
        <span className="section-number">A little clarity</span>
        <h2>
          A few things
          <br />
          before you go.
        </h2>
        <a className="under-link" href="/docs/what-is-verse-engine" id="lnk-read-the-documentation">
          Read the documentation
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>
              {f.q}
              <span>{i === 0 ? "−" : "+"}</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
