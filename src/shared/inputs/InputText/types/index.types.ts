import { type FormikHandlers } from "formik";

export interface PropsInputText {
  handleChange: FormikHandlers["handleChange"];
  value: string | number | undefined;
  id: string;
  name: string;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
  onChange?: () => void;
  hasError?: boolean;
}
