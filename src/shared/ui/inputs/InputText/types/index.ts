import type { PropsInput } from "@/shared/types";

export interface PropsInputText extends PropsInput {
  value: string | number | undefined;
  placeholder?: string;
  clickClear?: () => void;
  type: "number" | "text";
}
