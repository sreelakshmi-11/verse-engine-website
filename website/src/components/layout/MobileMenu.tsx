// Mobile navigation dialog: opened by the header button; closed by the close button, Escape or a link click.
// Emits `verse:menu` ({open}) for page modules and returns focus to the menu button.
import { HEADER_NAV, RESOURCES_MENU } from "../../pages/resources/data.ts";
import Chevron from "../ui/Chevron.tsx";
import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

type DialogRef = RefObject<HTMLDialogElement | null>;
type SetOpen = Dispatch<SetStateAction<boolean>>;
type MenuGroup = (typeof HEADER_NAV.mobileGroups)[keyof typeof HEADER_NAV.mobileGroups];

const emit = (open: boolean) => document.dispatchEvent(new CustomEvent("verse:menu", { detail: { open } }));
const menuGroup = (group: MenuGroup) => (
  <details className="m-group" key={group.label}>
    <summary>
      {group.label}
      <Chevron className="m-chev" />
    </summary>
    <div>
      {group.links.map(({ href, label }) => (
        <a key={href} href={href}>
          {label}
        </a>
      ))}
    </div>
  </details>
);

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
        <button className="menu-close" aria-label="Close navigation" onClick={onCloseButton}>
          {"Close ×"}
        </button>
      </div>
      <nav aria-label="Mobile navigation">
        <a href={HEADER_NAV.mobilePrimary.engine.href}>{HEADER_NAV.mobilePrimary.engine.label}</a>
        {menuGroup(HEADER_NAV.mobileGroups.developers)}
        <a href={HEADER_NAV.mobilePrimary.pricing.href}>{HEADER_NAV.mobilePrimary.pricing.label}</a>
        {menuGroup(HEADER_NAV.mobileGroups.plugins)}
        <details className="m-group">
          <summary>
            {HEADER_NAV.resources.label}
            <Chevron className="m-chev" />
          </summary>
          <div>
            {RESOURCES_MENU.map((r) => (
              <a key={r.href} href={r.href}>
                {r.label}
              </a>
            ))}
          </div>
        </details>
        <a href={HEADER_NAV.mobilePrimary.about.href}>{HEADER_NAV.mobilePrimary.about.label}</a>
        {HEADER_NAV.mobileActions.map(({ href, label, mobileClassName, mobileArrow }) => (
          <a key={href} className={mobileClassName} href={href}>
            {label}
            {mobileArrow && <span aria-hidden="true" />}
          </a>
        ))}
      </nav>
      <p>{"A new dimension is one link away."}</p>
    </dialog>
  );
}
