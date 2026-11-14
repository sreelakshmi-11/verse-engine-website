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
  <details className="m-group" id={group.id} key={group.id}>
    <summary id={group.summaryId}>
      {group.label}
      <Chevron className="m-chev" />
    </summary>
    <div>
      {group.links.map(({ href, label, id }) => (
        <a key={id} href={href} id={id}>
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
        <button id="btn-menu-close" className="menu-close" aria-label="Close navigation" onClick={onCloseButton}>
          {"Close ×"}
        </button>
      </div>
      <nav id="nav-mobile" aria-label="Mobile navigation">
        <a href={HEADER_NAV.mobilePrimary.engine.href} id={HEADER_NAV.mobilePrimary.engine.id}>
          {HEADER_NAV.mobilePrimary.engine.label}
        </a>
        {menuGroup(HEADER_NAV.mobileGroups.developers)}
        <a href={HEADER_NAV.mobilePrimary.pricing.href} id={HEADER_NAV.mobilePrimary.pricing.id}>
          {HEADER_NAV.mobilePrimary.pricing.label}
        </a>
        {menuGroup(HEADER_NAV.mobileGroups.plugins)}
        <details className="m-group" id={HEADER_NAV.resources.mobileId}>
          <summary id={HEADER_NAV.resources.mobileSummaryId}>
            {HEADER_NAV.resources.label}
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
        <a href={HEADER_NAV.mobilePrimary.about.href} id={HEADER_NAV.mobilePrimary.about.id}>
          {HEADER_NAV.mobilePrimary.about.label}
        </a>
        {HEADER_NAV.mobileActions.map(({ href, label, mobileId, mobileClassName, mobileArrow }) => (
          <a key={mobileId} id={mobileId} className={mobileClassName} href={href}>
            {label}
            {mobileArrow && <span aria-hidden="true" />}
          </a>
        ))}
      </nav>
      <p>{"A new dimension is one link away."}</p>
    </dialog>
  );
}
