import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types/index.types";

interface ProfileInitialValues {
  firstName: string;
  age: string | number;
  description: string;
  sex: "Мужской" | "Женский";
  photo: undefined | File;
  city: string | IPropsCell;
}

export interface PropsFormProfile {
  initialValues: ProfileInitialValues;
  handleSubmit: (values: any) => Promise<any>;
  formStateWatcher: React.ReactNode;
  cities: IPropsCell[];
}
