// The app shell: everything inside <body>, matching the original index.html. Route-dependent parts
// (visibility, current nav link, page, announcement) come from `view`.
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import SkipLink from "../components/layout/SkipLink.tsx";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import MobileMenu, { openMenu } from "../components/layout/MobileMenu.tsx";
import Announcer from "../components/layout/Announcer.tsx";

type ShellPage = ReactNode;
export type ShellView = {
  skipHidden: boolean;
  headerHidden: boolean;
  footerHidden: boolean;
  footerIntro: boolean;
  navCurrent?: string | null;
  mainHidden: boolean;
  mainClass?: string;
  mainPage?: ShellPage;
  standaloneHidden: boolean;
  standaloneClass?: string;
  standalonePage?: ShellPage;
  announcement: string;
};

export default function Shell({ view }: { view: ShellView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null),
    menuButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      {"\n"}
      <SkipLink hidden={view.skipHidden} />
      {"\n"}
      <Header view={view} menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={() => openMenu(dialogRef, setMenuOpen)} />
      {"\n"}
      <main id="app-main" tabIndex={-1} className={view.mainClass} hidden={view.mainHidden}>
        {view.mainPage}
      </main>
      {"\n"}
      <Footer hidden={view.footerHidden} intro={view.footerIntro} />
      {"\n"}
      <MobileMenu dialogRef={dialogRef} menuButtonRef={menuButtonRef} setMenuOpen={setMenuOpen} />
      {"\n"}
      <div id="app-standalone" className={view.standaloneClass} hidden={view.standaloneHidden}>
        {view.standalonePage}
      </div>
      {"\n"}
      <Announcer text={view.announcement} />
      {"\n"}
      <noscript>
        <p style={{ padding: 24, fontFamily: "sans-serif" }}>Verse Engine needs JavaScript to display this site.</p>
      </noscript>
      {"\n\n\n"}
    </>
  );
}
