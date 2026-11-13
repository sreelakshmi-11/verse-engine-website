// Sign-in page (/signin). A prototype: any details continue to the Playground; the "session" is a flag in this
// browser's storage. ?mode=signup opens "Create account"; ?next=/path is where to go after (default /studio).
import Logo from "../components/ui/Logo.tsx";
import { useLayoutEffect, useRef, useState } from "react";
import StudioGate from "./studio/StudioGate.tsx";
import type { FormEvent } from "react";
import { useTabs } from "../hooks/useTabs.ts";

type Mode = "pw" | "tok";
const MODES: Mode[] = ["pw", "tok"];

const SESSION = "verse-playground-session";

export default function Signin() {
  const params = useRef(new URLSearchParams(location.search)).current;
  const [mode, setMode] = useState<Mode>("pw"); // "pw": email & password, "tok": name + API token
  const [signup, setSignup] = useState(() => params.get("mode") === "signup");
  const [keep, setKeep] = useState(false); // data-keep is set once the visitor switches
  const [msg, setMsg] = useState("");
  const email = useRef<HTMLInputElement>(null),
    name = useRef<HTMLInputElement>(null),
    tokenName = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    email.current!.focus();
  }, []);

  const next = (() => {
    const n = params.get("next") || "/studio";
    return n.startsWith("/") && !n.startsWith("//") ? n : "/studio";
  })();
  function finish(who: string, mail: string) {
    try {
      localStorage.setItem(SESSION, JSON.stringify({ name: who, email: mail, at: Date.now() }));
    } catch {
      /* still continue */
    }
    document.dispatchEvent(new CustomEvent("verse:navigate", { detail: { href: next } }));
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "pw") {
      const mail = email.current!.value.trim(),
        who = name.current!.value.trim();
      finish(who || (mail.split("@")[0] || "Guest").replace(/[._-]+/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Guest", mail);
    } else finish(tokenName.current!.value.trim() || "Guest", "");
  }
  // Any arrow, Home or End key switches to the other mode.
  const { tabProps, focus } = useTabs(
    MODES,
    mode,
    (key, fromKeyboard) => {
      setMode(key);
      if (fromKeyboard) focus(key);
    },
    (key) => (["ArrowLeft", "ArrowRight", "Home", "End"].includes(key) ? (mode === "pw" ? 1 : 0) : null),
  );

  return (
    <>
      <a className="skip" href="#signin-main" id="lnk-skip-to-content">
        Skip to content
      </a>
      <header className="st-top" id="hdr-st-top">
        <a className="brand" href="/" aria-label="Verse Engine by Ctruh – Home" id="lnk-verse-engine-home-2">
          <Logo className="h-10" />
        </a>
        <div className="st-top-actions">
          <a className="st-link" href="/pricing" id="lnk-pricing-4">
            Pricing
          </a>
          <a className="st-link" href="/docs/what-is-verse-engine" id="lnk-docs-2">
            Docs
          </a>
        </div>
      </header>
      {"\n"}
      <main id="signin-main" className="si-wrap" tabIndex={-1}>
        <form className="si-card" id="si-form" noValidate onSubmit={onSubmit}>
          <p className="eyebrow" id="si-eyebrow">
            {signup ? "CREATE ACCOUNT" : "SIGN IN"}
          </p>
          <h1 id="si-title">{signup ? "Start for free." : "Welcome back."}</h1>
          <p className="si-sub" id="si-sub" data-keep={keep ? "" : undefined}>
            {signup ? "Create an account to open Verse Engine Studio." : "Sign in to open Verse Engine Studio."}
          </p>
          {"\n"}
          <div className="seg si-seg" role="tablist" aria-label="Sign-in method">
            <button type="button" role="tab" id="tab-pw" aria-controls="panel-pw" data-mode="pw" {...tabProps("pw")}>
              {"Email & password"}
            </button>
            <button type="button" role="tab" id="tab-tok" aria-controls="panel-tok" data-mode="tok" {...tabProps("tok")}>
              Name + API token
            </button>
          </div>
          {"\n"}
          <div id="panel-pw" role="tabpanel" aria-labelledby="tab-pw" hidden={mode !== "pw"}>
            <label className="field si-name" hidden={!(signup && mode === "pw")}>
              Name
              <input id="su-name" autoComplete="name" placeholder="Your name" ref={name} />
            </label>
            <label className="field">
              WORK EMAIL
              <input id="si-email" type="email" autoComplete="email" placeholder="you@company.com" ref={email} />
            </label>
            <label className="field">
              PASSWORD
              <input id="si-pass" type="password" autoComplete={signup ? "new-password" : "current-password"} placeholder="••••••••" />
            </label>
            <div className="si-forgot">
              <button
                type="button"
                className="under-link"
                id="si-forgot"
                onClick={() => setMsg("Password reset is not connected in this prototype. Enter any details to continue.")}
              >
                Forgot password?
              </button>
            </div>
          </div>
          {"\n"}
          <div id="panel-tok" role="tabpanel" aria-labelledby="tab-tok" hidden={mode !== "tok"}>
            <label className="field">
              NAME
              <input id="tk-name" autoComplete="name" placeholder="Your name" ref={tokenName} />
            </label>
            <label className="field">
              API TOKEN
              <input id="tk-token" type="password" autoComplete="off" placeholder="vk_••••••••" />
            </label>
          </div>
          {"\n"}
          <p className="si-msg" id="si-msg" role="status" aria-live="polite">
            {msg}
          </p>
          {"\n"}
          <button className="btn si-submit" type="submit" id="btn-sign-in">
            <span id="si-go">{signup ? "Create account" : "Sign in"}</span>
          </button>
          {"\n"}
          <p className="si-alt">
            <span id="si-alt-t">{signup ? "Already have an account?" : "New to Verse Engine?"}</span>{" "}
            <button
              type="button"
              className="under-link"
              id="si-switch"
              onClick={() => {
                setSignup(!signup);
                setKeep(true);
                setMsg("");
              }}
            >
              {signup ? "Sign in" : "Create an account"}
            </button>
          </p>
          {"\n"}
          <p className="si-proto">PROTOTYPE · ANY DETAILS CONTINUE TO STUDIO · NOTHING IS SENT ANYWHERE</p>
        </form>
      </main>
      <StudioGate path="/signin" />
      {"\n"}
    </>
  );
}
