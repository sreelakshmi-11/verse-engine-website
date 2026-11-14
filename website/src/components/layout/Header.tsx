// Site header: brand, main navigation (current route marked), actions and the menu button.
import Logo from "../ui/Logo.tsx";
import ResourcesNav from "./ResourcesNav.tsx";
import { HEADER_NAV } from "../../pages/resources/data.ts";
import type { RefObject } from "react";
import type { ShellView } from "../../app/Shell.tsx";

type HeaderProps = { view: ShellView; menuOpen: boolean; menuButtonRef: RefObject<HTMLButtonElement | null>; onOpenMenu: () => void };

export default function Header({ view, menuOpen, menuButtonRef, onOpenMenu }: HeaderProps) {
  return (
    <header className="site-header growth-header" hidden={view.headerHidden}>
      <a className="brand" href="/" aria-label="Verse Engine by Ctruh – Home">
        <Logo className="h-10 md:h-12" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {HEADER_NAV.desktopBeforeResources.map(({ href, label, current }) => (
          <a key={href} className="nav-link" href={href} aria-current={view.navCurrent === current ? "page" : undefined}>
            {label}
          </a>
        ))}
        <ResourcesNav current={view.navCurrent} />
        {HEADER_NAV.desktopAfterResources.map(({ href, label, current }) => (
          <a key={href} className="nav-link" href={href} aria-current={view.navCurrent === current ? "page" : undefined}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        {HEADER_NAV.desktopActions.map(({ href, label, id, className }) => (
          <a key={id} id={id} className={className} href={href}>
            <span>{label}</span>
          </a>
        ))}
        <button
          ref={menuButtonRef}
          className="menu-button"
          aria-label="Open navigation"
          aria-controls="menu-dialog"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <svg className="menu-icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
            <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
