// Challenge page (/challenge). The form is a preview: it checks the fields and sends nothing (the live form is on
// verse.ctruh.com). Upload, link and WhatsApp are tabs; arrow keys switch them.
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { FormEvent } from "react";
import { ARROWS, useTabs } from "../hooks/useTabs.ts";
import SiteButton from "../components/ui/SiteButton.tsx";
import PageHero from "../components/ui/PageHero.tsx";

type Tab = "upload" | "link" | "wa";
const TABS: Tab[] = ["upload", "link", "wa"];

export default function Challenge() {
  const [active, setActive] = useState<Tab>("upload");
  const [touched, setTouched] = useState(false); // tab attributes are set from the first choice on
  const [fileName, setFileName] = useState("Choose your 3D file");
  const [error, setError] = useState(""),
    [errorShown, setErrorShown] = useState(false);
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null),
    file = useRef<HTMLInputElement>(null),
    doneBox = useRef<HTMLDivElement>(null);

  function select(key: Tab, focus = false) {
    setActive(key);
    setTouched(true);
    if (focus) focusTab(key);
  }
  const { tabProps: baseTabProps, focus: focusTab } = useTabs(TABS, active, select, ARROWS);
  // Until the first choice, the upload tab has no tabindex.
  const tabProps = (key: Tab) => ({ ...baseTabProps(key), tabIndex: !touched && key === "upload" ? undefined : active === key ? 0 : -1 });
  function onFile() {
    const f = file.current!.files![0];
    setFileName(f ? f.name + " · " + (f.size / 1048576).toFixed(1) + " MB" : "Choose your 3D file");
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const el = form.current!,
      f = new FormData(el),
      msg: string[] = [],
      chosen = file.current!.files![0];
    const field = (name: string) => {
      const value = f.get(name);
      return typeof value === "string" ? value : "";
    };
    if (!field("name").trim()) msg.push("your name");
    if (!/^\S+@\S+\.\S+$/.test(field("email"))) msg.push("a valid email");
    if (!field("company").trim()) msg.push("your company");
    if (active === "upload" && !chosen) msg.push("a 3D file");
    else if (active === "upload" && chosen.size > 1073741824) msg.push("a file under 1 GB, or send a link instead");
    if (active === "link" && !/^https?:\/\/\S+/.test(field("link"))) msg.push("a link to the file");
    if (!(el.elements.namedItem("rights") as HTMLInputElement).checked) msg.push("confirmation that you have the right to send the file");
    if (msg.length) {
      flushSync(() => {
        setDone(false);
        setError("Please add " + msg.join(", ") + ".");
        setErrorShown(true);
      });
      return;
    }
    flushSync(() => {
      setErrorShown(false);
      setDone(true);
    });
    doneBox.current!.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  return (
    <>
      {"\n"}
      <PageHero eyebrow="THE VERSE CHALLENGE" title="Send us a 3D scene" accent="no browser engine can open.">
        <p className="hero-description">
          We’ll turn it into a link anyone can open. We have already opened a 1.8-billion-triangle scene from a link in a desktop browser. Upload yours, send us
          a link to it, or WhatsApp it. It stays private unless you say otherwise.
        </p>
      </PageHero>
      {"\n"}
      <section className="content-width section-space ch-enter" id="enter" aria-labelledby="ch-enter">
        <div>
          <p className="eyebrow">ENTER THE CHALLENGE</p>
          <h2 id="ch-enter">
            Name, email and company,
            <br />
            then the file.
          </h2>
          <p className="ch-lede">We reply with a link you can open in a browser.</p>
        </div>
        {"\n"}
        <form className="ch-form" id="ch-form" noValidate ref={form} onSubmit={onSubmit}>
          {"\n"}
          <p className="ch-preview" role="note">
            <strong>Preview.</strong>
            {" This form is a design mockup. Nothing you enter is sent or stored. To enter for real, use the "}
            <a href="https://verse.ctruh.com/challenge" target="_blank" rel="noopener">
              live form
            </a>
            .
          </p>
          {"\n"}
          <div className="ch-tabs" role="tablist" aria-label="How to send your scene">
            <button type="button" role="tab" id="t-upload" aria-controls="p-upload" data-tab="upload" {...tabProps("upload")}>
              Upload the file
            </button>
            <button type="button" role="tab" id="t-link" aria-controls="p-link" data-tab="link" {...tabProps("link")}>
              Send a link
            </button>
            <button type="button" role="tab" id="t-wa" aria-controls="p-wa" data-tab="wa" {...tabProps("wa")}>
              WhatsApp it
            </button>
          </div>
          {"\n"}
          <div className="ch-grid">
            <label>
              Your name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="ch-wide">
              Company
              <input name="company" autoComplete="organization" required />
            </label>
          </div>
          {"\n"}
          <div className="ch-panel" id="p-upload" role="tabpanel" aria-labelledby="t-upload" hidden={active !== "upload"}>
            <label className="ch-drop" htmlFor="ch-file">
              <span className="ch-drop-icon" aria-hidden="true">
                ↑
              </span>
              <strong id="ch-file-name">{fileName}</strong>
              <span>GLB, glTF, FBX, OBJ, USDZ or a ZIP, up to 1 GB</span>
              <input id="ch-file" name="file" type="file" accept=".glb,.gltf,.fbx,.obj,.usdz,.zip" ref={file} onChange={onFile} />
            </label>
          </div>
          {"\n"}
          <div className="ch-panel" id="p-link" role="tabpanel" aria-labelledby="t-link" hidden={active !== "link"}>
            <label className="ch-wide">
              Link to the hosted file
              <input name="link" type="url" placeholder="https://" />
            </label>
            <p className="ch-help">Drive, Dropbox, S3, WeTransfer… up to 20 GB.</p>
          </div>
          {"\n"}
          <div className="ch-panel" id="p-wa" role="tabpanel" aria-labelledby="t-wa" hidden={active !== "wa"}>
            <p className="ch-help">
              {"Send the file to "}
              <strong>+91 74115 97778</strong>
              {" on WhatsApp, from any number. Submit this form too, so we can match your file to you."}
            </p>
            <SiteButton href="https://wa.me/917411597778" target="_blank" rel="noopener">
              Open WhatsApp
            </SiteButton>
          </div>
          {"\n"}
          <div className="ch-grid">
            <label className="ch-wide">
              {"What makes it hard? "}
              <em>(optional)</em>
              <textarea name="hard" rows={3} />
            </label>
            <label className="ch-wide">
              {"Website "}
              <em>(optional)</em>
              <input name="website" type="url" placeholder="https://" />
            </label>
          </div>
          {"\n"}
          <label className="ch-check">
            <input type="checkbox" name="hall" />
            <span>You may show this scene in the public hall of fame once a person at Ctruh approves it. Leave this unticked and it stays private.</span>
          </label>
          {"\n"}
          <label className="ch-check">
            <input type="checkbox" name="rights" required />
            <span>
              {"I have the right to send this file and accept the "}
              <a href="#rules">challenge rules</a>
              {" and the "}
              <a href="https://verse.ctruh.com/privacy" target="_blank" rel="noopener">
                privacy policy
              </a>
              .
            </span>
          </label>
          {"\n"}
          <p className="ch-error" id="ch-error" role="alert" hidden={!errorShown}>
            {error}
          </p>
          {"\n"}
          <button className="site-button" type="submit">
            Send it to Verse
            <span aria-hidden="true" />
          </button>
          {"\n"}
          <div className="ch-done" id="ch-done" role="status" hidden={!done} ref={doneBox}>
            <h3>This is a preview.</h3>
            <p>Your entry was not sent. To take the challenge, continue on the live form.</p>
            <SiteButton href="https://verse.ctruh.com/challenge" target="_blank" rel="noopener">
              Open the live form
            </SiteButton>
          </div>
          {"\n"}
        </form>
      </section>
      {"\n"}
      <section className="page-band ch-proof" aria-labelledby="ch-proof">
        <div className="content-width">
          <p className="eyebrow">PROOF</p>
          <h2 id="ch-proof">
            <span className="ch-badge">Verified</span>
            {" 1,805,458,557 triangles in the scene. 2 GB compiled. Opens from a link in a desktop browser."}
          </h2>
          <p>
            {"A production city scene with 1,805,458,557 triangles in the scene, compiled to 2 GB, opens from a link in a desktop browser. No app, no plug-in."}
          </p>
        </div>
      </section>
      {"\n"}
      <section className="content-width section-space" aria-labelledby="ch-hall">
        <p className="eyebrow">HALL OF FAME</p>
        <h2 id="ch-hall">
          Scenes whose owners said yes,
          <br />
          approved by us.
        </h2>
        <p className="ch-lede">Open any of them from its link.</p>
        <p className="ch-empty">No scenes here yet. The first entry that survives the challenge, and gets approved, lands here.</p>
      </section>
      {"\n"}
      <section className="content-width section-space ch-rules" id="rules" aria-labelledby="ch-rules">
        <p className="eyebrow">RULES AND TERMS</p>
        <h2 id="ch-rules">Rules and terms</h2>
        <div className="ch-rule-grid">
          {"\n"}
          <article>
            <h3>What we do with your file</h3>
            <ul>
              <li>Your file is private by default. Only you and Ctruh staff handling the challenge can see it.</li>
              <li>
                {
                  "We publish a scene to the hall of fame only if you ticked permission on the form and a person at Ctruh approved it. You can ask us to remove it any time at "
                }
                <a href="mailto:hello@ctruh.com">hello@ctruh.com</a>.
              </li>
              <li>We use your name, email and company to reply and to follow up about Verse. We do not sell them.</li>
              <li>Unpublished files are deleted on request.</li>
            </ul>
          </article>
          {"\n"}
          <article>
            <h3>Limits and fair play</h3>
            <ul>
              <li>Upload limit: 1 GB in the browser. Bigger files: send a link (up to 20 GB) or WhatsApp.</li>
              <li>Only send files you have the right to share.</li>
              <li>We make no promise that every scene opens. If one does not, we tell you why.</li>
              <li>The challenge is open to everyone and may change or end without notice.</li>
            </ul>
          </article>
        </div>
      </section>
      {"\n"}
    </>
  );
}
