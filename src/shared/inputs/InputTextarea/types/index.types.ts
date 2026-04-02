import { type FormikHandlers } from "formik";

export interface PropsInputTextarea {
  handleChange: FormikHandlers["handleChange"];
  value: string | undefined;
  id: string;
  name: string;
  placeholder?: string;
  onChange: () => void;
  hasError?: boolean;
}
