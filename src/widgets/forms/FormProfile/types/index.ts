import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types/index.types";

interface ProfileInitialValues {
  firstName: string;
  age: string | number;
  description: string;
  sex: "male" | "female";
  photo: undefined | File | string;
  city: string | IPropsCell;
}

export interface PropsFormProfile {
  initialValues: ProfileInitialValues;
  handleSubmit: (values: any) => Promise<any>;
  cities: IPropsCell[];
  isDataLoading: boolean;
  useStatusValidateButton: (...props: any) => void;
  useClickButton: (...props: any) => void;
  getParamsButton: () => any;
}

export type ButtonSubmitStatuses =
  | "valid"
  | "noValid"
  | "loading"
  | "success"
  | "error";
