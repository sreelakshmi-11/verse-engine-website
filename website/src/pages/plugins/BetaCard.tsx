import { Fragment } from "react";
import SiteButton from "../../components/ui/SiteButton.tsx";
import { downloadUrl } from "../../data/plugins.ts";
import PackageFile from "./PackageFile.tsx";
import type { BetaPlugin } from "./beta-plugins.tsx";

/** A 4.0 beta plug-in: requirement, download, checksum and install steps. */
export default function BetaCard({ plugin: p }: { plugin: BetaPlugin }) {
  return (
    <article className="beta-card">
      <header>
        <h3>{p.name}</h3>
        <span className="release-tag">Beta</span>
      </header>
      <p>{p.requirement}</p>
      <SiteButton secondary href={downloadUrl(p.file)} id={p.downloadId}>
        {"Download for " + p.name}
      </SiteButton>
      <PackageFile name={p.name} version={p.version} size={p.size} file={p.file} hash={p.hash} />
      {/* The line breaks between the elements are part of the original markup. */}
      <details>
        {"\n        "}
        <summary>Install</summary>
        {"\n        "}
        <ol>
          {p.steps.map((step, i) => (
            <Fragment key={i}>
              {"\n          "}
              <li>{step}</li>
            </Fragment>
          ))}
          {"\n        "}
        </ol>
        {"\n        "}
        <p className="req">
          <a href={"/docs/guides/" + p.guide}>{"Full guide: Publish from " + p.guideName}</a>
        </p>
        {"\n      "}
      </details>
    </article>
  );
}
