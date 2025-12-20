import { type FormikHandlers } from "formik";
import { type IPropsInputSubtitle } from "@/shared/inputs/SubtitleInput";

export interface IPropsInputFile extends IPropsInputSubtitle {
  handleChange: FormikHandlers["handleChange"];
  label: string;
  id: string;
  name: string;
  photoPreview: Blob | MediaSource | undefined | string;
  onChange: () => void;
  clearValue: () => void;
}
