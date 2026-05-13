import type { Sex } from "@/shared/types";
import type { PropsCell } from "@/shared/ui/inputs/InputSearchSelect";

export interface ProfileInitialValues {
  name: string;
  age: string | number;
  description: string;
  sex: Sex;
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
