import { Fragment } from "react";
import SiteButton from "../../components/ui/SiteButton.tsx";
import { downloadUrl } from "../../data/plugins.ts";
import { nth, slug } from "../../utils/ids.ts";
import PackageFile from "./PackageFile.tsx";
import type { BetaPlugin } from "./beta-plugins.tsx";

/** A 4.0 beta plug-in: requirement, download, checksum and install steps. `index` numbers its ids. */
export default function BetaCard({ plugin: p, index }: { plugin: BetaPlugin; index: number }) {
  return (
    <article className="beta-card" id={nth("art-beta-card", index)}>
      <header id={nth("hdr-item", index)}>
        <h3>{p.name}</h3>
        <span className="release-tag">Beta</span>
      </header>
      <p>{p.requirement}</p>
      <SiteButton secondary href={downloadUrl(p.file)} id={"lnk-download-for-" + slug(p.name)}>
        {"Download for " + p.name}
      </SiteButton>
      <PackageFile name={p.name} version={p.version} size={p.size} file={p.file} hash={p.hash} />
      {/* The line breaks between the elements are part of the original markup. */}
      <details id={nth("dtl-item", index)}>
        {"\n        "}
        <summary id={nth("sum-install", index)}>Install</summary>
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
          <a href={"/docs/guides/" + p.guide} id={"lnk-full-guide-publish-from-" + slug(p.guideName)}>
            {"Full guide: Publish from " + p.guideName}
          </a>
        </p>
        {"\n      "}
      </details>
    </article>
  );
}
