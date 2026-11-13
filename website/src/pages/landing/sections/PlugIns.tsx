// Home page: tools section.
import { plugins, publishingLabels } from "../data.ts";
import { tab } from "../parts.tsx";
import { pluginMeshes } from "../../../data/plugins.ts";
import { stepNumber } from "../../../utils/format.ts";

export default function PlugIns() {
  const firstPlugin = plugins[0];
  return (
    <section className="tools-section plugin-section section-pad" id="tools" aria-labelledby="publish-heading">
      <header className="plugin-heading" id="hdr-plugin-heading">
        <div>
          <p className="plugin-eyebrow">YOUR TOOLS, UNTOUCHED</p>
          <h2 id="publish-heading">
            Your tools.
            <br />
            <span>A bigger stage.</span>
          </h2>
        </div>
        <div className="plugin-intro">
          <p>No export dance. One button inside the editor you already live in, on Mac and Windows. Substance 3D Painter is in beta.</p>
          <a className="button action" href="/plugins" id="lnk-see-all-plug-ins">
            <span>See all plug-ins</span>
          </a>
        </div>
      </header>
      <div className="plugin-tabs" role="tablist" aria-label="Publishing tools" aria-orientation="horizontal">
        {plugins.map((p, i) => (
          <button key={p.model} id={`publisher-${p.model}`} {...tab(i)} aria-controls="plugin-view" tabIndex={i === 0 ? undefined : -1} data-publisher={i}>
            <span className="plugin-order" aria-hidden="true">
              {stepNumber(i)}
            </span>
            <span>{p.name}</span>
            <i aria-hidden="true">↓</i>
          </button>
        ))}
      </div>
      <div className="plugin-view" id="plugin-view" role="tabpanel" tabIndex={0} aria-labelledby={`publisher-${firstPlugin.model}`}>
        <div className="plugin-details">
          <div className="plugin-selected">
            <span className="plugin-source-label">{`${firstPlugin.name} → Verse Engine`}</span>
            <h3 id="plugin-name">{firstPlugin.name}</h3>
            <p id="plugin-description">{firstPlugin.description}</p>
          </div>
          <div className="plugin-timing">
            <strong id="plugin-time">
              {firstPlugin.time}
              <span>s</span>
            </strong>
            <div>
              <span id="plugin-timing-label">{firstPlugin.label}</span>
              <small>Desktop browser benchmark</small>
            </div>
          </div>
          <a className="plugin-transfer" href="/plugins" aria-label="See all plug-ins" id="lnk-see-all-plug-ins-2">
            →
          </a>
        </div>
        <figure className="plugin-scene plugin-workflow" id="fig-plugin-scene">
          <div className="plugin-publishing" data-plugin-visual="">
            <div className="publishing-heading">
              <span className="workflow-editor">{firstPlugin.name}</span>
              <span className="publishing-arrow" aria-hidden="true">
                →
              </span>
              <span>Verse Engine</span>
            </div>
            <svg className="publishing-drawing" viewBox="0 0 760 300" role="img" aria-label={firstPlugin.alt}>
              <defs>
                {plugins.map(({ model }) => (
                  <g
                    key={model}
                    id={`plugin-mesh-${model}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={pluginMeshes[model].strokeWidth}
                    strokeLinejoin="round"
                  >
                    {pluginMeshes[model].paths.map((d, i) => (
                      <path key={i} d={d} />
                    ))}
                  </g>
                ))}
              </defs>
              <rect x="24" y="19" width="310" height="250" rx="8" fill="#fff" stroke="#d2d2d7" />
              <path d="M24 49h310M74 49v220" fill="none" stroke="#e0e0e0" />
              <g fill="#d2d2d7">
                <circle cx="40" cy="34" r="3" />
                <circle cx="52" cy="34" r="3" />
                <circle cx="64" cy="34" r="3" />
                <rect x="38" y="70" width="23" height="3" rx="1.5" />
                <rect x="38" y="84" width="18" height="3" rx="1.5" />
                <rect x="38" y="98" width="24" height="3" rx="1.5" />
              </g>
              <path d="M89 213l106-37 122 34-108 39Z M119 225l104-38M151 235l101-39 M124 201l112 35M160 188l111 35" fill="none" stroke="#e0e0e0" />
              <use data-publishing-model="" href="#plugin-mesh-blender" x="84" y="93" color="#6e6e73" />
              <path d="M334 147h96" stroke="#0066cc" strokeWidth="1.5" />
              <path d="m421 141 9 6-9 6" fill="none" stroke="#0066cc" strokeWidth="1.5" />
              <circle cx="381" cy="147" r="17" fill="#0066cc" />
              <path d="M381 155v-16m-5 5 5-5 5 5" fill="none" stroke="#fff" strokeWidth="1.5" />
              <rect x="434" y="49" width="302" height="210" rx="11" fill="#fff" stroke="#c0d6ed" />
              <path d="M434 78h302" stroke="#c0d6ed" />
              <g fill="#0066cc">
                <circle cx="451" cy="64" r="2.5" />
                <circle cx="461" cy="64" r="2.5" />
                <circle cx="471" cy="64" r="2.5" />
              </g>
              <rect x="503" y="58" width="163" height="12" rx="6" fill="#f5f5f7" />
              <use data-publishing-model="" href="#plugin-mesh-blender" x="465" y="110" color="#0066cc" />
            </svg>
            <div className="publishing-labels">
              {publishingLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
          <figcaption>
            <span id="plugin-scene-label">{firstPlugin.scene}</span>
            <span>Workflow illustration</span>
          </figcaption>
        </figure>
      </div>
      <div className="plugin-upcoming">
        <span>Coming soon</span>
        <p>
          {"Revit, SketchUp, Rhino, 3ds Max, Archicad, Maya, Cinema 4D, Houdini and more. BIM models arrive through IFC today. "}
          <a href="/plugins#aec" id="lnk-explore-beta-plug-ins">
            Explore beta plug-ins
          </a>
        </p>
      </div>
    </section>
  );
}
