import type { SnackbarItem } from "./store.types";

export interface PropsSnackbar {
  before: any;
  after: any;
  description: string;
  header: string;
  onClose: () => void;
  action?: any;
  timeForDelete?: number;
}

export interface PropsCustomSnackbar {
  item: SnackbarItem;
  fnDeleteSnackbar: (id: number) => void;
}
