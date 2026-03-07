import { type FormikHandlers } from "formik";
import { type IPropsInputSubtitle } from "@/shared/inputs/SubtitleInput";

export interface IPropsInputText extends IPropsInputSubtitle {
  handleChange: FormikHandlers["handleChange"];
  value: string | number | undefined;
  id: string;
  name: string;
  header?: string;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
  onChange?: () => void;
  hasError?: boolean;
}

export interface IPropsClearButton {
  clickClear?: () => void;
}
