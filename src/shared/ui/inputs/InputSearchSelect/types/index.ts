import type { PropsInput } from "@/shared/types";

export interface PropsInputSearchSelect extends PropsInput {
  value: PropsCell | string;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
  handleChangeClue: (value: PropsCell) => void;
  options: Array<PropsCell>;
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
