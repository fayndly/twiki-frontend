import type { IPropsCell } from "../types/index.types";

const normalize = (str: string) => {
  return str.toLowerCase().replace(/ё/g, "е").trim();
};

const matchScore = (value: IPropsCell, query: string): number => {
  const c = normalize(value.label);
  const q = normalize(query);

  if (!q) return 0;
  if (c === q) return 1000;
  if (c.startsWith(q)) return 800;
  if (c.split(" ").some((word) => word.startsWith(q))) return 600;

  const index = c.indexOf(q);
  if (index !== -1) {
    return 400 - index;
  }

  return -1;
};

export const sortValuesByMatch = (
  values: IPropsCell[],
  query: string
): IPropsCell[] => {
  return values
    .map((value) => ({
      value: value.value,
      label: value.label,
      score: matchScore(value, query),
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};
