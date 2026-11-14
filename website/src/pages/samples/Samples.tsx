// Samples page (/samples).
import PageHero from "../../components/ui/PageHero.tsx";
import { SAMPLES } from "./data.ts";
import { stepNumber } from "../../utils/format.ts";

export default function Samples() {
  return (
    <>
      <PageHero eyebrow="REAL SCENES · REAL POSSIBILITIES" title="Put 3D" accent="to work.">
        <p className="hero-description">
          Links and embeds anywhere. Verse for Real Estate, Verse for Commerce, Verse Play for games, and the Verse API, SDK and MCP for developers and AI
          agents.
        </p>
      </PageHero>
      <section className="samples-grid content-width section-space">
        {SAMPLES.map((sample, i) => (
          <article className="sample-card" key={sample.href}>
            <a href={sample.href} aria-label={sample.label} id={sample.id}>
              <img src={`/assets/sample-${i}.webp`} alt={sample.alt} width="720" height="450" loading={i === 0 ? "eager" : "lazy"} />
              <div>
                <span className="step-number">{stepNumber(i)}</span>
                <h2>{sample.title}</h2>
                <p>{sample.text}</p>
                <span className="sample-action">{sample.action}</span>
              </div>
            </a>
          </article>
        ))}
      </section>
      <p className="sample-credits content-width">
        {"Sample imagery from Verse by Ctruh. Game-world image: Amazon Lumberyard Bistro, CC BY 4.0. "}
        <a href="/docs/attributions">Demo scene credits</a>
      </p>
    </>
  );
}
