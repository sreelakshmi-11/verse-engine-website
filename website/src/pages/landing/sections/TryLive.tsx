// Home page: try-live section.
import { tryHeading, tryScenes } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";
import { stepNumber } from "../../../utils/format.ts";

export default function TryLive() {
  const firstScene = tryScenes[0];
  return (
    <section className="mx-tryit section-pad" id="try-live" aria-labelledby="try-heading">
      <SectionHead heading={tryHeading} />
      <div className="mx-try" data-try="">
        <div className="mx-try-list" role="tablist" aria-label="Live scenes">
          {tryScenes.map((s, i) => (
            <button key={s.scene} id={s.id} {...tab(i)} data-scene={s.scene} data-img={s.image}>
              <span>{stepNumber(i)}</span>
              <strong>{s.title}</strong>
              <small>{s.text}</small>
            </button>
          ))}
        </div>
        <div className="mx-try-stage">
          <img data-try-img="" src={firstScene.image} alt="Preview of the selected live scene" width="720" height="450" />
          <div className="mx-try-card">
            <div className="mx-qr" data-qr="" aria-label="QR code that opens the selected scene on your phone" role="img" />
            <div className="mx-try-copy">
              <strong>Scan to open on your phone</strong>
              <span>No app. No sign-up. The link opens straight into the scene.</span>
              <a className="button action" data-try-open="" href={firstScene.scene} target="_blank" rel="noopener">
                <span>Open it here ↗</span>
              </a>
            </div>
          </div>
          <span className="mx-try-url" data-try-url="">
            {firstScene.scene.replace("https://", "")}
          </span>
        </div>
      </div>
    </section>
  );
}
