// Home page: challenge section.
import { useHomeButtonIds } from "../button-ids.ts";

export default function ChallengeTeaser() {
  const ids = useHomeButtonIds();
  return (
    <section className="challenge-section challenge-editorial" id="challenge" aria-labelledby="challenge-heading">
      <header className="challenge-editorial-head">
        <div>
          <p className="section-label">THE VERSE ENGINE CHALLENGE IS LIVE</p>
          <h2 id="challenge-heading">
            Bring a scene
            <br />
            <span>
              NO BROWSER
              <br />
              CAN OPEN.
            </span>
          </h2>
        </div>
        <div className="challenge-invitation">
          <p>
            A real 10.3-billion-triangle city already opens from a link. Think yours is bigger? Send your heaviest file. If Verse Engine fails to stream it, you
            win.
          </p>
          <a className="button action" href="/challenge" id={ids.challenge}>
            <span>Take the Challenge</span>
          </a>
        </div>
      </header>
      <p className="technical-note">
        Performance figures are desktop browser benchmarks. Results vary with scene, device and connection. The point-cloud story above is an illustrative
        visualization; Lyon and the use-case samples are real Verse scenes.
      </p>
    </section>
  );
}
