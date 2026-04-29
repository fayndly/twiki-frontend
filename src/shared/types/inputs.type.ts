import type { FormikHandlers } from "formik";

export interface PropsInput {
  onChange: () => void;
  handleChange: FormikHandlers["handleChange"];
  id: string;
  name: string;
  hasErrors?: boolean;
}
