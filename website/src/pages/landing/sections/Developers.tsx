// Home page: developers section.
import { devHeading, devTabs, devFeatures } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";

export default function Developers() {
  return (
    <section className="mx-dev section-pad" id="developers" aria-labelledby="dev-heading">
      <SectionHead heading={devHeading} />
      <div className="mx-dev-body" data-dev="">
        <div className="mx-console">
          <div className="mx-console-top">
            <div className="mx-console-tabs" role="tablist" aria-label="Code samples">
              {devTabs.map((t, i) => (
                <button key={t.code} id={t.id} {...tab(i)} data-code={t.code}>
                  {t.label}
                  {t.badge && <em>{t.badge}</em>}
                </button>
              ))}
            </div>
            <button className="mx-copy" type="button" data-copy-code="" id="btn-dev-copy-code">
              Copy
            </button>
          </div>
          <pre data-pane="embed">
            <code>
              <span className="c">{"<!-- the whole embed -->"}</span>
              {"\n"}
              <span className="k">{"<script"}</span>
              {" src\x3d"}
              <span className="s">{'"https://verse.ctruh.com/embed.js"'}</span>
              {"\n        data-scene="}
              <span className="s">{'"your-scene"'}</span>
              <span className="k">{"></script>"}</span>
              {"\n\n"}
              <span className="c">{"<!-- or as a component -->"}</span>
              {"\n"}
              <span className="k">{"<verse-viewer"}</span>
              {" scene="}
              <span className="s">{'"your-scene"'}</span>
              <span className="k">{"></verse-viewer>"}</span>
            </code>
          </pre>
          <pre data-pane="rest" hidden>
            <code>
              <span className="c">{"# Upload any 3D file. Get a streamable scene back."}</span>
              {"\ncurl -X POST https://verse.ctruh.com/v1/ingest \\\n  -H "}
              <span className="s">{'"Authorization: Bearer $VERSE_API_KEY"'}</span>
              {" \\\n  --data-binary @scene.glb\n\n"}
              <span className="c">{'# → { "job": "…" }  poll it, or get a webhook when it\'s live'}</span>
            </code>
          </pre>
          <pre data-pane="mcp" hidden>
            <code>
              <span className="c">{"# Connect the Verse MCP server to your AI assistant, then ask:"}</span>
              {"\n\n"}
              <span className="s">{'"Publish warehouse.fbx to Verse as a private link."'}</span>
              {"\n\n"}
              <span className="c">{"# The assistant uploads the file and hands back"}</span>
              {"\n"}
              <span className="c">{"# a published, signed link."}</span>
            </code>
          </pre>
        </div>
        <ul className="mx-dev-list">
          {devFeatures.map((f) => (
            <li key={f.title}>
              <strong>{f.title}</strong>
              <span>{f.text}</span>
            </li>
          ))}
          <li>
            <a className="under-link" href="/developers">
              Read the docs →
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
