import { useRef } from "react";
import type { KeyboardEvent } from "react";

/** The tab a key moves to (its index), or null when the key does nothing. */
export type TabKeys = (key: string, index: number, count: number) => number | null;

/** Arrow keys move to the next or previous tab (wrapping around); Home and End to the first and last. */
export const ARROWS_HOME_END: TabKeys = (key, i, n) =>
  key === "Home" ? 0 : key === "End" ? n - 1 : key === "ArrowRight" ? (i + 1) % n : key === "ArrowLeft" ? (i + n - 1) % n : null;

/** Arrow keys only (wrapping around). */
export const ARROWS: TabKeys = (key, i, n) => (key === "ArrowRight" ? (i + 1) % n : key === "ArrowLeft" ? (i + n - 1) % n : null);

/**
 * An ARIA tab list: `tabProps(tab)` gives each tab button its ref, selected state, roving tabindex, click and
 * keyboard handlers. `select(tab, fromKeyboard)` is called on a click or key; `focus(tab)` focuses a tab button.
 */
export function useTabs<T extends string>(tabs: readonly T[], selected: T, select: (tab: T, fromKeyboard: boolean) => void, keys: TabKeys = ARROWS_HOME_END) {
  const buttons = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});
  const focus = (tab: T) => buttons.current[tab]!.focus();
  const tabProps = (tab: T) => ({
    ref: (el: HTMLButtonElement | null) => {
      buttons.current[tab] = el;
    },
    "aria-selected": selected === tab,
    tabIndex: selected === tab ? 0 : -1,
    onClick: () => select(tab, false),
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
      const next = keys(event.key, tabs.indexOf(tab), tabs.length);
      if (next === null) return;
      event.preventDefault();
      select(tabs[next], true);
    },
  });
  return { tabProps, focus };
}
