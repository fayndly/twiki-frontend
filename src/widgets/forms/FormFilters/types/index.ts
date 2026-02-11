import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types/index.types";

export interface FiltersInitialValues {
  firstAge: string | number;
  lastAge: string | number;
  sex: "male" | "female";
  city: string | IPropsCell;
}
