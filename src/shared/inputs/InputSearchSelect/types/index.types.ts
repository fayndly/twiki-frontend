import { type FormikHandlers } from "formik";
import { type IPropsInputSubtitle } from "@/shared/inputs/SubtitleInput";

export interface IPropsInputSearchSelect extends IPropsInputSubtitle {
  handleChange: FormikHandlers["handleChange"];
  value: IPropsCell | string;
  id: string;
  name: string;
  header?: string;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
  handleChangeClue: (value: IPropsCell) => void;
  options: Array<IPropsCell>;
  onChange: () => void;
}

export interface IPropsClearButton {
  onClick?: () => void;
  className?: string;
}

export interface IPropsCell {
  value: string;
  label: string;
}

export interface IPropsClue {
  suggestions: IPropsCell[];
  isFocused: boolean;
  handleChangeClue: (value: IPropsCell) => void;
}
