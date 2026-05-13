import type { Sex } from "@/shared/types";
import type { PropsCell } from "@/shared/ui/inputs/InputSearchSelect";

export interface FiltersInitialValues {
  ageMin: number | string;
  ageMax: number | string;
  sex: Sex;
  city: string | PropsCell;
}
