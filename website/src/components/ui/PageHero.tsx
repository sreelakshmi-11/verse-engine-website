import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  /** The heading: a first line, then an accented second line. */
  title: string;
  accent: string;
  /** A second hero on the same page uses an <h2 class="page-title">. */
  level?: 1 | 2;
  /** Description paragraphs and actions under the heading. */
  children?: ReactNode;
};

/** The hero at the top of a page: eyebrow, two-line heading and what follows it. */
export default function PageHero({ id = "hdr-page-hero", eyebrow, title, accent, level = 1, children }: Props) {
  const Heading = level === 2 ? "h2" : "h1";
  return (
    <header className="page-hero content-width" id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading className={level === 2 ? "page-title" : undefined}>
        {title}
        <br />
        <span>{accent}</span>
      </Heading>
      {children}
    </header>
  );
}
