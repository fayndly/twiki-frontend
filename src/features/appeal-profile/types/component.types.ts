import type { From } from "./store.types";

export interface AppealInitialValues {
  type: string;
  description: string;
}

export interface PropsButtonAppeal {
  cardId: number;
  from: From;
}
