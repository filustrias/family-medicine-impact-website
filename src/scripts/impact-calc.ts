export const P_MF_BASE = 0.336;

export type ImpactCategoryKey = "detection" | "tests" | "referrals" | "hospital";
export type ChangeClass = "neutral" | "favorable" | "unfavorable";

/**
 * Deconstructs the observed event rate to recover the generalist baseline,
 * then rebuilds the total rate for an arbitrary proportion of family physicians.
 *
 * Matches the formula validated in dashboard9-reference.py (lines 2626-2632).
 *
 * @param base    observed events/year in the original cohort
 * @param RR      risk ratio (family physicians vs generalists)
 * @param pMF     simulated proportion of FPs (0..1)
 * @param pop     at-risk population
 * @returns       [new value, delta vs baseline]
 */
export function calc(
  base: number,
  RR: number,
  pMF: number,
  pop: number
): [number, number] {
  if (pop <= 0) return [base, 0];
  const rG = base / (pop * (1 - P_MF_BASE + P_MF_BASE * RR));
  const n = pop * ((1 - pMF) * rG + pMF * RR * rG);
  return [n, n - base];
}

export function formatNumber(
  n: number,
  locale: "pt-BR" | "en-US" = "pt-BR"
): string {
  return Math.round(n).toLocaleString(locale);
}

export function formatDelta(
  delta: number,
  locale: "pt-BR" | "en-US" = "pt-BR"
): string {
  const rounded = Math.round(delta);
  if (rounded > 0) return "↑ " + formatNumber(rounded, locale);
  if (rounded < 0) return "↓ " + formatNumber(Math.abs(rounded), locale);
  return "0";
}

export function getChangeClass(
  category: ImpactCategoryKey,
  delta: number
): ChangeClass {
  if (Math.abs(delta) < 0.5) return "neutral";
  if (category === "detection") return delta > 0 ? "favorable" : "unfavorable";
  return delta < 0 ? "favorable" : "unfavorable";
}
