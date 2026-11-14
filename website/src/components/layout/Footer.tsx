// Site footer. FOOTER_LINKS adds the Resources pages and related links to the columns.
import Logo from "../ui/Logo.tsx";
import { FOOTER_LINKS, PRODUCT } from "../../pages/resources/data.ts";
import SiteButton from "../ui/SiteButton.tsx";

const footerLinks = (links: { href: string; label: string; id: string }[]) =>
  links.map(({ href, label, id }) => <a key={id} href={href} id={id}>{label}</a>);

export default function Footer({ hidden, intro }: { hidden: boolean; intro: boolean }) {
  return (
    <footer id="site-footer" className="page-footer" hidden={hidden}>
      {intro && (
        <div className="footer-intro">
          <p>
            {"Any 3D world,"}
            <br />
            <strong>{"as a link."}</strong>
          </p>
          <SiteButton href="/studio" id="lnk-explore-verse-engine">
            {"Explore Verse Engine"}
          </SiteButton>
          <span>{"Built in Bengaluru and San Francisco."}</span>
        </div>
      )}
      <div className={"footer-links" + (intro ? "" : " border-t-0! pt-0!")}>
        <div>
          <a className="brand" href="/" aria-label="Verse Engine by Ctruh – Home" id="lnk-verse-engine-home">
            <Logo className="h-12" />
          </a>
          <p>{PRODUCT.definition}</p>
          <p>
            {"3D, XR and AI infrastructure"}
            <br />
            {"for the spatial internet."}
          </p>
        </div>
        <nav aria-label="Engine resources" id="nav-engine-resources">
          <h3>{"EXPLORE"}</h3>
          {footerLinks(FOOTER_LINKS.explore)}
        </nav>
        <nav aria-label="Developer resources" id="nav-developer-resources">
          <h3>{"BUILD"}</h3>
          {footerLinks(FOOTER_LINKS.build)}
        </nav>
        <nav aria-label="Editor plug-ins" id="nav-editor-plug-ins">
          <h3>{"PLUG-INS"}</h3>
          {footerLinks(FOOTER_LINKS.plugins)}
        </nav>
        <nav aria-label="Contact Ctruh" id="nav-contact-ctruh">
          <h3>{"CONNECT"}</h3>
          {footerLinks(FOOTER_LINKS.connect)}
        </nav>
      </div>
      <div className="page-footer-bottom">
        <span>{"© 2026 CTRUH Technologies Private Limited. Verse Engine by Ctruh is a product of Ctruh."}</span>
        {footerLinks(FOOTER_LINKS.bottom)}
      </div>
    </footer>
  );
}
