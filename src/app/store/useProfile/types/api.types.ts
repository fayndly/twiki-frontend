import type { PropsCell } from "@/shared/ui/inputs/InputSearchSelect";

type Sex = "male" | "female";

export interface ValuesUpdateProfile {
  name: string;
  age: number;
  description: string;
  sex: Sex;
  photo: string | File;
  cityId: string | PropsCell;
  changes?: {
    age?: boolean;
    city?: boolean;
  };
}

export interface DTOProfile {
  name: string;
  age: number;
  description: string;
  sex: Sex;
  photo: string;
  cityId: string;
}
