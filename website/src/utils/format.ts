/** A number with at least two digits: 7 -> "07". */
export const twoDigits = (n: number) => String(n).padStart(2, "0");

/** The label of the nth (0-based) item in a numbered list: 0 -> "01". */
export const stepNumber = (index: number) => twoDigits(index + 1);
