import { type FormikHandlers } from "formik";

export interface PropsInputSearchSelect {
  handleChange: FormikHandlers["handleChange"];
  value: PropsCell | string;
  id: string;
  name: string;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
  handleChangeClue: (value: PropsCell) => void;
  options: Array<PropsCell>;
  onChange: () => void;
  hasErrors?: boolean;
}

export interface PropsCell {
  value: string;
  label: string;
  subtitle?: string;
}

export interface PropsClue {
  suggestions: PropsCell[];
  handleChangeClue: (value: PropsCell) => void;
  isVisible: boolean;
}
