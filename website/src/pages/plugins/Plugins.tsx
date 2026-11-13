// Plug-ins catalogue (/plugins).
import SiteButton from "../../components/ui/SiteButton.tsx";
import { EDITORS, downloadUrl } from "../../data/plugins.ts";
import { nth } from "../../utils/ids.ts";
import BetaCard from "./BetaCard.tsx";
import PackageFile from "./PackageFile.tsx";
import ToolArt from "./ToolArt.tsx";
import { BETA_PLUGINS } from "./beta-plugins.tsx";
import PageHero from "../../components/ui/PageHero.tsx";

export default function Plugins() {
  return (
    <>
      <PageHero eyebrow="PLUG-INS FOR UNREAL, UNITY AND BLENDER" title="Publish big projects" accent="straight from your tool.">
        <p className="hero-description">
          Press one button in your editor and get a link anyone can open in a browser. A Blender project goes live in about 45 seconds, Unreal in 70, Unity in
          101.
        </p>
        <div className="page-actions">
          <SiteButton href="/studio" id="lnk-explore-verse-engine-2">
            Explore Verse Engine
          </SiteButton>
          <a className="text-link" href="#aec" id="lnk-architecture-design-tools">
            {"Architecture & design tools "}
          </a>
        </div>
      </PageHero>
      <div className="plugin-benefits content-width">
        <span>Up to 20 GB per scene</span>
        <span>Resumable uploads</span>
        <span>We optimise it for you</span>
      </div>
      <section className="page-band plugin-catalog" id="sec-page-band">
        <div className="content-width">
          <header className="catalog-heading" id="hdr-catalog-heading">
            <h2>Available now.</h2>
            <p>Real packages. One guide for every editor.</p>
          </header>
          <div className="plugin-card-grid">
            {EDITORS.map((editor, i) => (
              <article className="plugin-card" id={nth("art-plugin-card", i)} key={editor.id}>
                <figure id={nth("fig-item", i)}>
                  <ToolArt editor={editor} id={"mesh-production-" + editor.id} />
                  <figcaption>Workflow illustration</figcaption>
                </figure>
                <div>
                  <div className="plugin-card-heading">
                    <h3>{editor.name}</h3>
                    <span>{"Scene → link · " + editor.time}</span>
                  </div>
                  <p className="release-tag">{"Shipped · v" + editor.version}</p>
                  <p className="plugin-requirement">{editor.requirement}</p>
                  <p>{editor.description}</p>
                  <div className="page-actions">
                    <SiteButton href={downloadUrl(editor.file)} id={nth("lnk-download", i)}>
                      Download
                    </SiteButton>
                    <a className="text-link" href={"/plugins/" + editor.id} id={nth("lnk-install-guide", i)}>
                      {"Install guide "}
                    </a>
                  </div>
                  <PackageFile {...editor} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="beta-catalog content-width section-space" id="aec">
        <header className="section-heading" id="hdr-section-heading">
          <p className="eyebrow">4.0 BETA</p>
          <h2>
            Architecture, design
            <br />
            {"& CAD tools."}
          </h2>
          <p>
            {
              "Tested against a real Verse server through each plug-in's own upload code; not yet run inside every host app — each guide says what has and has not been checked."
            }
          </p>
        </header>
        <div className="beta-grid">
          {BETA_PLUGINS.map((plugin, i) => (
            <BetaCard plugin={plugin} index={i} key={plugin.name} />
          ))}
        </div>
      </section>
      <section className="download-check page-band" id="sec-download-check">
        <div className="content-width">
          <div>
            <p className="eyebrow">EVERY FILE IS LISTED</p>
            <h2>Check a download.</h2>
            <p>
              {"Every file's SHA-256 is shown with it and listed in "}
              <a className="text-link" href="https://verse.ctruh.com/downloads/SHA256SUMS" id="lnk-sha256sums">
                {"SHA256SUMS "}
              </a>
              .
            </p>
            <p>
              {
                "Each package bundles verse-prepare (the optimiser) for macOS (Apple silicon and Intel), Windows and Linux. To publish to your own server instead, change the server URL in the plug-in's settings."
              }
            </p>
            <a className="text-link" href="/docs/guides/run-your-own-server" id="lnk-run-your-own-server">
              {"Run your own server "}
            </a>
          </div>
          <pre tabIndex={0}>
            <code>{"shasum -a 256 <file>\n# macOS / Linux\n\nGet-FileHash <file> -Algorithm SHA256\n# Windows PowerShell"}</code>
          </pre>
        </div>
      </section>
    </>
  );
}
