import type { IPropsCell } from "@/shared/inputs/InputSearchSelect/types";

export interface ValuesUpdateProfile {
  name: string;
  age: number;
  description: string;
  sex: "male" | "female";
  photo: string | File;
  cityId: string | IPropsCell;
}

export interface ProfileDto {
  name: string;
  age: number;
  description: string;
  sex: "male" | "female";
  photo: string;
  cityId: string;
}
