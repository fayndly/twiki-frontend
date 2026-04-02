import { type FormikHandlers } from "formik";

interface Option {
  value: string;
  label: string;
}

export interface PropsInputSelect {
  handleChange: FormikHandlers["handleChange"];
  value: string | undefined;
  id: string;
  name: string;
  options: Option[];
  onChange: () => void;
  hasError?: boolean;
}
