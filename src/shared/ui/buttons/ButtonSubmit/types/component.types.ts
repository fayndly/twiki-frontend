import type { MainButtonState } from "@tma.js/sdk-react";

export type StatusButtonSubmit =
  | "valid"
  | "noValid"
  | "loading"
  | "success"
  | "error"
  | "noChanges"
  | "void";

export type TypeButtonSubmit = "tg" | "button" | "html";

export interface PropsButtonSubmit {
  type?: TypeButtonSubmit;
  onSubmit: () => void;
}

export type ParamsButtonSubmit = Record<
  StatusButtonSubmit,
  Partial<MainButtonState>
>;

export interface PropsButtonDefault {
  isLoading?: MainButtonState["isLoaderVisible"];
  backgroundColor?: MainButtonState["bgColor"];
  color?: MainButtonState["textColor"];
  onClick: () => void;
  text?: MainButtonState["text"];
}
