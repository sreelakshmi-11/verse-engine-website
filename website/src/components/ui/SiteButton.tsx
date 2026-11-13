import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Outlined style. */
  secondary?: boolean;
  /** Show "→" after the label (otherwise the icon span is empty and styled by CSS). */
  arrow?: boolean;
};

/** A link styled as the site's button. */
export default function SiteButton({ secondary, arrow, children, ...link }: Props) {
  return (
    <a className={secondary ? "site-button secondary" : "site-button"} {...link}>
      {children}
      <span aria-hidden="true">{arrow ? "→" : null}</span>
    </a>
  );
}
