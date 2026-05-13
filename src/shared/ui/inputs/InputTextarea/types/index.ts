import type { PropsInput } from "@/shared/types";

export interface PropsInputTextarea extends PropsInput {
  value: string | undefined;
  placeholder?: string;
}
