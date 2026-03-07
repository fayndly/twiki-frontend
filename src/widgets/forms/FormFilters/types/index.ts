import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types";

export interface FiltersInitialValues {
  ageMin: number | string;
  ageMax: number | string;
  sex: "male" | "female";
  city: string | IPropsCell;
}
