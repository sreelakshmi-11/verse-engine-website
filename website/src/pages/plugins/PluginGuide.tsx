import { Fragment } from "react";
import type { ReactNode } from "react";
import SiteButton from "../../components/ui/SiteButton.tsx";
import { EDITORS, downloadUrl } from "../../data/plugins.ts";
import type { EditorId } from "../../data/plugins.ts";
import PackageFile from "./PackageFile.tsx";
import ToolArt from "./ToolArt.tsx";
import { stepNumber } from "../../utils/format.ts";

/** An editor's install guide (/plugins/<editor>): download, install steps and what gets published. */
export default function PluginGuide({ editor: id, steps, published }: { editor: EditorId; steps: ReactNode[]; published: string[] }) {
  const editor = EDITORS.find((e) => e.id === id)!,
    name = editor.name;
  return (
    <>
      <div className="content-width guide-breadcrumb">
        <a href="/plugins">Plug-ins</a>
        <span>/</span>
        <span>{name}</span>
        <nav aria-label="Editor install guides">
          {EDITORS.map((e) => (
            <a href={"/plugins/" + e.id} aria-current={e.id === id ? "page" : undefined} key={e.id}>
              {e.name}
            </a>
          ))}
        </nav>
      </div>
      <header className="guide-hero content-width">
        <div>
          <p className="eyebrow">{"SHIPPED · v" + editor.version}</p>
          <h1>
            Verse Engine
            <br />
            {"for "}
            <span>{name + "."}</span>
          </h1>
          <p>{editor.requirement}</p>
          <div className="page-actions">
            <SiteButton href={downloadUrl(editor.file)}>{"Download for " + name}</SiteButton>
          </div>
          <PackageFile {...editor} />
        </div>
        <figure className="guide-art">
          <ToolArt editor={editor} id={"mesh-live-guide-" + id} />
          <figcaption>Workflow illustration</figcaption>
        </figure>
      </header>
      <section className="guide-layout content-width section-space">
        <div>
          <h2>Install and publish.</h2>
          <ol className="guide-steps">
            {steps.map((step, i) => (
              <li key={i}>
                <span className="step-number">{stepNumber(i)}</span>
                <div>{step}</div>
              </li>
            ))}
          </ol>
          <div className="full-guide-cta">
            <h3>Go deeper.</h3>
            <p>The full guide covers export settings, materials, lighting and troubleshooting.</p>
            <SiteButton secondary arrow href={"/docs/guides/publish-from-" + id}>
              {"Publish from " + name}
            </SiteButton>
          </div>
        </div>
        <aside>
          <div className="requirements">
            <p className="eyebrow">WHAT GETS PUBLISHED</p>
            {/* The line breaks between the items are part of the original markup. */}
            <ul>
              {published.map((item) => (
                <Fragment key={item}>
                  {"\n          "}
                  <li>{item}</li>
                </Fragment>
              ))}
              {"\n        "}
            </ul>
          </div>
          <div className="guide-key">
            <h3>Big projects.</h3>
            <p>Up to 20 GB, sent in resumable parts. Browser uploads stop at 500 MB.</p>
            <a className="text-link" href="/studio">
              {"Open Studio "}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
