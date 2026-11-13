// Pieces shared by the home page sections.
import { Fragment } from "react";
import type { SectionHeading } from "./data.ts";

/** Lines joined with <br />. */
export const Lines = ({ lines }: { lines: string[] }) =>
  lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

/** Section header: number, two-line heading (second line accented), intro and an optional link. */
export function SectionHead({ heading }: { heading: SectionHeading }) {
  return (
    <header className="mx-head">
      <div>
        <span className="section-number">{heading.number}</span>
        <h2 id={heading.id}>
          {heading.title}
          <br />
          <span>{heading.accent}</span>
        </h2>
      </div>
      <p>
        {heading.text}
        {heading.link && (
          <>
            <br />
            <a className="under-link" href={heading.link.href} id={heading.link.id}>
              {heading.link.label}
            </a>
          </>
        )}
      </p>
    </header>
  );
}

/** Tab button attributes: first tab selected. */
export const tab = (i: number) => ({ role: "tab", "aria-selected": i === 0 });
