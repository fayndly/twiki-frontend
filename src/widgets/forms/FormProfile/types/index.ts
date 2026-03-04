import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types/index.types";

export interface ProfileInitialValues {
  name: string;
  age: string | number;
  description: string;
  sex: "male" | "female";
  photo: undefined | File | string;
  city: string | IPropsCell;
}

export interface PropsFormProfile {
  initialValues: ProfileInitialValues;
  handleSubmit: (values: ProfileInitialValues) => void;
  cities: IPropsCell[];
  isDataLoading: boolean;
  validateNoChanges: boolean;
  successActionFn: () => void;
}
