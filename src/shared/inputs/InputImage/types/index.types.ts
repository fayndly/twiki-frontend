import type { FormikHandlers } from "formik";

export interface PropsInputFile {
  handleChange: FormikHandlers["handleChange"];
  label: string;
  id: string;
  name: string;
  photoPreview: Blob | MediaSource | undefined | string;
  onChange: () => void;
  clearValue: () => void;
  hasErrors?: boolean;
}
