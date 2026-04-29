import type { PropsInput } from "@/shared/types";

export interface PropsInputFile extends PropsInput {
  label: string;
  photoPreview: Blob | MediaSource | undefined | string;
  clearValue: () => void;
}
