/** An element id as written in the page: lowercase words joined by "-" ("Figma (+ Spline)" -> "figma-spline"). */
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The id of the nth (0-based) of several similar elements: "card", "card-2", "card-3"… */
export const nth = (id: string, index: number) => (index === 0 ? id : `${id}-${index + 1}`);
