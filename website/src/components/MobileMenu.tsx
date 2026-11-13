// Mobile navigation dialog: opened by the header button; closed by the close button, Escape or a link click.
// Emits `verse:menu` ({open}) for page modules and returns focus to the menu button.
import { RESOURCES_MENU } from "../pages/resources/data.ts";
import { Chevron } from "./ResourcesNav.tsx";
import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

type DialogRef = RefObject<HTMLDialogElement | null>;
type SetOpen = Dispatch<SetStateAction<boolean>>;

const emit = (open: boolean) => document.dispatchEvent(new CustomEvent("verse:menu", { detail: { open } }));

export function openMenu(dialogRef: DialogRef, setMenuOpen: SetOpen) {
  dialogRef.current!.showModal();
  setMenuOpen(true);
  emit(true);
}

export default function MobileMenu({
  dialogRef,
  menuButtonRef,
  setMenuOpen,
}: {
  dialogRef: DialogRef;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  setMenuOpen: SetOpen;
}) {
  const onCloseButton = () => dialogRef.current!.close();
  const onClose = () => {
    setMenuOpen(false);
    emit(false);
    menuButtonRef.current!.focus();
  };
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as Element).closest("a")) dialogRef.current!.close();
  };
  return (
    <dialog className="menu-dialog growth-menu" id="menu-dialog" ref={dialogRef} onClose={onClose} onClick={onClick}>
      <div className="menu-top">
        <span>{"Verse Engine / Ctruh"}</span>
        <button id="btn-menu-close" className="menu-close" aria-label="Close navigation" onClick={onCloseButton}>
          {"Close ×"}
        </button>
      </div>
      <nav id="nav-mobile" aria-label="Mobile navigation">
        <a href="/story" id="lnk-the-engine-2">
          {"The engine"}
        </a>
        <details className="m-group" id="dtl-m-group">
          <summary id="sum-developers">
            {"Developers"}
            <svg className="m-chev" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path d="m5 9 7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div>
            <a href="/developers" id="lnk-developer-hub">
              {"Developer hub"}
            </a>
            <a href="/docs/what-is-verse-engine" id="lnk-documentation">
              {"Documentation"}
            </a>
            <a href="/docs/scenes-api" id="lnk-rest-api">
              {"REST API"}
            </a>
            <a href="/docs/sdk" id="lnk-sdk">
              {"SDK"}
            </a>
          </div>
        </details>
        <a href="/pricing" id="lnk-pricing-2">
          {"Pricing"}
        </a>
        <details className="m-group" id="dtl-m-group-2">
          <summary id="sum-plug-ins">
            {"Plug-ins"}
            <svg className="m-chev" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path d="m5 9 7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div>
            <a href="/plugins" id="lnk-all-plug-ins">
              {"All plug-ins"}
            </a>
            <a href="/plugins/blender" id="lnk-blender">
              {"Blender"}
            </a>
            <a href="/plugins/unity" id="lnk-unity">
              {"Unity"}
            </a>
            <a href="/plugins/unreal" id="lnk-unreal">
              {"Unreal"}
            </a>
          </div>
        </details>
        <details className="m-group" id="dtl-m-group-3">
          <summary id="sum-resources">
            {"Resources"}
            <Chevron className="m-chev" />
          </summary>
          <div>
            {RESOURCES_MENU.map((r) => (
              <a key={r.href} href={r.href} id={r.mobileId}>
                {r.label}
              </a>
            ))}
          </div>
        </details>
        <a href="/about" id="lnk-about-2">
          {"About"}
        </a>
        <a id="btn-menu-explore" className="site-button" href="/studio">
          {"Explore Verse Engine"}
          <span aria-hidden="true" />
        </a>
        <a id="btn-menu-challenge" className="menu-challenge" href="/challenge">
          {"Take the Challenge"}
        </a>
      </nav>
      <p>{"A new dimension is one link away."}</p>
    </dialog>
  );
}
