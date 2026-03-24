import type { PropsCell } from "@/shared/inputs/InputSearchSelect";

export interface ProfileInitialValues {
  name: string;
  age: string | number;
  description: string;
  sex: "male" | "female";
  photo: undefined | File | string;
  city: string | PropsCell;
  changes?: {
    age?: boolean;
    city?: boolean;
  };
}

interface Action {
  isError: boolean;
  refetch: () => Promise<any>;
  isSuccess: boolean;
}

export interface PropsFormProfile {
  initialValues: ProfileInitialValues;
  handleSubmit: (values: ProfileInitialValues) => void;
  cities: PropsCell[];
  isDataLoading: boolean;
  validateNoChanges: boolean;
  successActionFn: () => void;
  citiesActions: Action;
  profileActions?: Action;
  showSubmitButton: boolean;
}
