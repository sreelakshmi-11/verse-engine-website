// Developers page (/developers). Code sample tabs (from /code-samples.json): arrow keys, Home and End switch
// them; "Copy ⧉" copies the sample shown.
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTabs } from "../hooks/useTabs.ts";
import { copyText } from "../utils/clipboard.ts";
import SiteButton from "../components/ui/SiteButton.tsx";

type Tab = "embed" | "curl" | "javascript";
const TABS: Tab[] = ["embed", "curl", "javascript"];
const FIRST_SAMPLE = '<!-- Embed a scene -->\n<script src="https://verse.ctruh.com/embed.js"\n        data-scene="your-scene"></script>';

export default function Developers() {
  const [tab, setTab] = useState<Tab>("embed");
  const [code, setCode] = useState(FIRST_SAMPLE);
  const [status, setStatus] = useState("");
  const samples = useRef<Promise<Record<Tab, string>> | null>(null),
    serial = useRef(0);

  useEffect(() => {
    samples.current = fetch("/code-samples.json").then((r) => {
      if (!r.ok) throw Error();
      return r.json() as Promise<Record<Tab, string>>;
    });
  }, []);

  async function select(key: Tab, focus = false) {
    const request = ++serial.current;
    try {
      const data = (await samples.current)!;
      if (request !== serial.current) return;
      flushSync(() => {
        setTab(key);
        setCode(data[key]);
      });
      if (focus) focusTab(key);
      setStatus("");
    } catch {
      setStatus("The other examples could not be loaded. Please try again.");
    }
  }
  async function copy() {
    setStatus((await copyText(code)) ? "Code copied." : "Select the code and copy it with your keyboard.");
  }
  const { tabProps, focus: focusTab } = useTabs(TABS, tab, select);

  return (
    <>
      <section className="developer-hero content-width" id="sec-developer-hero">
        <header id="hdr-item">
          <p className="eyebrow">FOR DEVELOPERS · REST API + EMBED SDK</p>
          <h1>Build with Verse Engine</h1>
          <p>Upload, publish, embed and track 3D scenes with a REST API — or skip the backend and drop in one script tag.</p>
          <div className="page-actions">
            <SiteButton href="/studio/plugins" id="lnk-get-an-api-key-2">
              Get an API key
            </SiteButton>
            <a className="text-link" href="/docs/scenes-api" id="lnk-api-reference">
              {"API reference "}
            </a>
          </div>
        </header>
        <div className="code-window">
          <div className="code-window-header">
            <div className="code-tabs" role="tablist" aria-label="Code samples">
              <button role="tab" id="code-embed" aria-controls="code-panel" data-code-tab="embed" {...tabProps("embed")}>
                Embed SDK
              </button>
              <button role="tab" id="code-curl" aria-controls="code-panel" data-code-tab="curl" {...tabProps("curl")}>
                cURL
              </button>
              <button role="tab" id="code-javascript" aria-controls="code-panel" data-code-tab="javascript" {...tabProps("javascript")}>
                JavaScript
              </button>
            </div>
            <button className="copy-code" data-copy-code="" aria-label="Copy code sample" id="btn-copy-code-sample" onClick={copy}>
              Copy ⧉
            </button>
          </div>
          <div role="tabpanel" id="code-panel" aria-labelledby={"code-" + tab} tabIndex={0}>
            <pre>
              <code id="developer-code">{code}</code>
            </pre>
          </div>
          <p className="code-note">Replace your-scene with the published scene ID.</p>
          <span className="copy-status" aria-live="polite">
            {status}
          </span>
        </div>
      </section>
      <section className="round-trip page-band" id="sec-round-trip">
        <div className="content-width">
          <p className="eyebrow">THE ROUND TRIP</p>
          <ol>
            <li>
              <span className="step-number">01</span>
              <code>POST /v1/ingest</code>
              <p>Send a file, a scan or a floor plan.</p>
            </li>
            <li>
              <span className="step-number">02</span>
              <code>processing</code>
              <p>Verse Engine prepares and signs it once.</p>
            </li>
            <li>
              <span className="step-number">03</span>
              <code>ready → share link</code>
              <p>Your server hears the moment it’s live.</p>
            </li>
            <li>
              <span className="step-number">04</span>
              <code>{"<verse-viewer>"}</code>
              <p>Drop the ID into any page. Done.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="content-width section-space" id="sec-content-width">
        <div className="developer-capabilities">
          <article id="art-item">
            <p className="eyebrow">API</p>
            <h2>{"API management & docs"}</h2>
            <p>A REST API for everything you can do in Studio.</p>
            <ul className="check-list">
              <li>Upload files and scans</li>
              <li>Publish and get a signed link</li>
              <li>Embed anywhere</li>
              <li>Track views, sessions and watch time</li>
              <li>Webhooks when a scene is ready</li>
            </ul>
            <SiteButton secondary arrow href="/docs/scenes-api" id="lnk-api-docs">
              API docs
            </SiteButton>
          </article>
          <article id="art-item-2">
            <p className="eyebrow">SDK</p>
            <h2>{"SDK install & docs"}</h2>
            <p>Embed a scene on any site with one script tag or a web component.</p>
            <ul className="check-list">
              <li>One script tag</li>
              <li>Web component for React and Vue</li>
              <li>Private, revocable links</li>
              <li>Works on phones, laptops and headsets</li>
              <li>Run your own server</li>
            </ul>
            <SiteButton secondary arrow href="/docs/embed-sdk" id="lnk-sdk-install-guide">
              SDK install guide
            </SiteButton>
          </article>
        </div>
      </section>
      <section className="quickstart content-width section-space" id="sec-quickstart">
        <header className="section-heading" id="hdr-section-heading">
          <p className="eyebrow">START BUILDING</p>
          <h2>
            Quickstart,
            <br />
            in three calls.
          </h2>
        </header>
        <ol>
          <li>
            <span className="step-number">01</span>
            <h3>Create an API key</h3>
            <p>{"Sign in to Studio and create a key under Plug-ins & API."}</p>
            <a className="text-link" href="/studio" id="lnk-open-studio">
              {"Open Studio "}
            </a>
          </li>
          <li>
            <span className="step-number">02</span>
            <h3>Upload your first scene</h3>
            <p>POST a file, then wait for the job to finish.</p>
            <a className="text-link" href="/docs/scenes-api" id="lnk-set-up-webhooks">
              {"Set up webhooks "}
            </a>
          </li>
          <li>
            <span className="step-number">03</span>
            <h3>Embed it</h3>
            <p>Add the SDK script and drop in the scene ID.</p>
            <a className="text-link" href="/docs/embed-sdk" id="lnk-sdk-guide">
              {"SDK guide "}
            </a>
          </li>
        </ol>
      </section>
    </>
  );
}
