import type { ProfileInitialValues } from "../types";

export const initialValues: ProfileInitialValues = {
  name: "",
  age: "",
  description: "",
  sex: "",
  photo: undefined,
  city: "",
  changes: {
    age: false,
    city: false,
  },
};
