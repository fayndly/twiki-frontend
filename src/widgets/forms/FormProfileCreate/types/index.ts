import type { RGB } from "@tma.js/sdk-react";

export type ButtonSubmitStatuses =
  | "valid"
  | "noValid"
  | "loading"
  | "success"
  | "error";

interface ParamsMainButton {
  isVisible?: boolean;
  bgColor?: RGB;
  hasShineEffect?: boolean;
  isEnabled?: boolean;
  isLoaderVisible?: boolean;
  text?: string;
  textColor?: RGB;
}

export type ParamsButton = Record<
  "valid" | "noValid" | "loading" | "success" | "error",
  ParamsMainButton
>;
