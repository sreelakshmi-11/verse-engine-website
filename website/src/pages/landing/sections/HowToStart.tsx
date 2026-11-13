// Home page: how-to-start section.
import { workflowCards, shareBadges } from "../data.ts";

function UploadVisual() {
  return (
    <div className="workflow-visual upload-visual" role="img" aria-label="Supported scene formats">
      <div className="upload-target">
        <span className="upload-icon">↑</span>
        <strong>Drag anything 3D here</strong>
        <p>.glb   .fbx   .usdz   .ifc   floor-plan.pdf</p>
        <small>20+ TYPES</small>
      </div>
      <div className="upload-file">
        <span>◇</span>
        <strong>hsr-office-scan.e57</strong>
        <small>3.4 GB</small>
      </div>
    </div>
  );
}

function PrepareVisual() {
  return (
    <div className="workflow-visual prepare-visual">
      <div className="prepare-file">
        <strong>warehouse_twin_final.fbx</strong>
        <span>RUNS ONCE</span>
      </div>
      <div className="prepare-label">
        <span>Scene streaming prep</span>
        <small>processing</small>
      </div>
      <div className="prepare-progress">
        <i />
      </div>
      <div className="security-sign">
        <span className="security-icon">✓</span>
        <div>
          <strong>Security signing</strong>
          <p>Signature attached · ready for phones, laptops, headsets</p>
        </div>
      </div>
      <div className="prepare-ready">
        <i />
        Ready to stream
      </div>
    </div>
  );
}

function ShareVisual() {
  return (
    <div className="workflow-visual share-visual">
      <div className="scene-share">
        <span>verse.ctruh.com/s/your-scene</span>
        <button data-copy-scene="" aria-label="Copy link" id="btn-copy-link">
          {"Copy link "}
          <i>⧉</i>
        </button>
      </div>
      <div className="share-badges">
        {shareBadges.map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
      <span className="share-feedback" aria-live="polite" />
    </div>
  );
}

const workflowVisuals = { upload: UploadVisual, prepare: PrepareVisual, share: ShareVisual };

export default function HowToStart() {
  return (
    <section className="workflow-section section-pad" id="how-to-start" aria-labelledby="workflow-heading">
      <div className="workflow-intro">
        <span className="section-number">HOW TO START</span>
        <h2 id="workflow-heading">
          Drop. Cook.
          <br />
          <span>SEND IT FLYING.</span>
        </h2>
        <p>THREE MOVES. ZERO INSTALLS. THE WHOLE TRIP TAKES LESS TIME THAN EXPORTING A RENDER.</p>
      </div>
      <div className="workflow-stack">
        {workflowCards.map((card) => {
          const Visual = workflowVisuals[card.visual];
          return (
            <article key={card.id} className="workflow-card" id={card.id}>
              <header id={card.headerId}>
                <span>{card.n}</span>
                <h3>{card.title}</h3>
                <small>{card.sub}</small>
              </header>
              <div className="workflow-content">
                <p>{card.text}</p>
                <Visual />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
