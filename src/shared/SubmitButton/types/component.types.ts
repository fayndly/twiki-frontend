import type { MainButtonState } from "@tma.js/sdk-react";

export type StatusSubmitButton =
  | "valid"
  | "noValid"
  | "loading"
  | "success"
  | "error"
  | "noChanges"
  | "void";

export type TypeSubmitButton = "tg" | "button" | "html";

export interface PropsSubmitButton {
  type: TypeSubmitButton;
  onSubmit: () => void;
}

export type ParamsSubmitButton = Record<
  StatusSubmitButton,
  Partial<MainButtonState>
>;

export interface PropsButtonDefault {
  isLoading?: MainButtonState["isLoaderVisible"];
  backgroundColor?: MainButtonState["bgColor"];
  color?: MainButtonState["textColor"];
  onClick: () => void;
  text?: MainButtonState["text"];
}
