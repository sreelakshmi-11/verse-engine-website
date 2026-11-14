// "Resources" in the header: a dropdown with Samples, the Resources pages and planned links
// (RESOURCES_MENU in resources/data.ts). The mobile menu lists the same links.
import { useEffect, useRef, useState } from "react";
import type { FocusEvent, MouseEvent, PointerEvent } from "react";
import Chevron from "../ui/Chevron.tsx";
import { HEADER_NAV, RESOURCES_MENU } from "../../pages/resources/data.ts";

export default function ResourcesNav({ current }: { current?: string | null }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null),
    buttonRef = useRef<HTMLButtonElement>(null),
    openedByHover = useRef(false);

  // Close when the route changes, on Escape, and on a click or tap outside.
  useEffect(() => setOpen(false), [current]);
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current!.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current!.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // A mouse opens it on hover; a click (touch, keyboard, or mouse) toggles it.
  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && !open) {
      openedByHover.current = true;
      setOpen(true);
    }
  };
  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      openedByHover.current = false;
      setOpen(false);
    }
  };
  const onToggle = () => {
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen((o) => !o);
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current!.contains(event.relatedTarget)) setOpen(false);
  };
  const onMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest("a")) setOpen(false);
  };

  const active = RESOURCES_MENU.some((r) => r.href === current);
  return (
    <div className={"nav-drop" + (open ? " is-open" : "")} ref={rootRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      <button
        type="button"
        ref={buttonRef}
        className="nav-link nav-drop-toggle"
        aria-expanded={open}
        aria-controls="nav-resources-menu"
        data-current={active ? "true" : undefined}
        onClick={onToggle}
      >
        {HEADER_NAV.resources.label}
        <Chevron className="nav-drop-chev" />
      </button>
      <div className="nav-drop-menu" id="nav-resources-menu" hidden={!open} onClick={onMenuClick}>
        {RESOURCES_MENU.map((r) => (
          <a key={r.href} href={r.href} aria-current={current === r.href ? "page" : undefined}>
            {r.label}
          </a>
        ))}
      </div>
    </div>
  );
}
