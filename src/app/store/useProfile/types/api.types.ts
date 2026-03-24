import type { PropsCell } from "@/shared/inputs/InputSearchSelect";

export interface ValuesUpdateProfile {
  name: string;
  age: number;
  description: string;
  sex: "male" | "female";
  photo: string | File;
  cityId: string | PropsCell;
  changes?: {
    age?: boolean;
    city?: boolean;
  };
}

export interface ProfileDto {
  name: string;
  age: number;
  description: string;
  sex: "male" | "female";
  photo: string;
  cityId: string;
}
