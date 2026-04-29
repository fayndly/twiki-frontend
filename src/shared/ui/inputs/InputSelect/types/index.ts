import type { PropsInput } from "@/shared/types";

interface Option {
  value: string;
  label: string;
}

export interface PropsInputSelect extends PropsInput {
  value: string | undefined;
  options: Option[];
}
