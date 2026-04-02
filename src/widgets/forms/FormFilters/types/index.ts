import type { PropsCell } from "@/shared/inputs/InputSearchSelect";

export interface FiltersInitialValues {
  ageMin: number | string;
  ageMax: number | string;
  sex: "male" | "female";
  city: string | PropsCell;
}
