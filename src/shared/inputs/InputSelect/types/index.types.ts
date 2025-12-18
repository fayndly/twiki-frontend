import { type FormikHandlers } from "formik";
import { type IPropsInputSubtitle } from "@/shared/inputs/SubtitleInput";

interface Option {
  value: string;
  label: string;
}

export interface IPropsInputSelect extends IPropsInputSubtitle {
  handleChange: FormikHandlers["handleChange"];
  value: string | undefined;
  id: string;
  name: string;
  header?: string;
  options: Option[];
  onChange: () => void;
}
