import type { StateCreator } from "zustand";

type RetryFunction<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => Promise<TResult>;

type RetryArgs = any[];

interface Actions {
  open: () => void;
  close: () => void;
  add: (
    header: string,
    description: string,
    type: SnackbarItem["type"],
    retryFunction: RetryFunction<any, any>,
    ...args: RetryArgs
  ) => void;
  delete: (id: number) => void;
}

export interface SnackbarItem {
  id: number;
  header: string;
  description: string;
  type: "serverError" | "clientError";
  retryFunction?: RetryFunction<any, any>;
  args?: RetryArgs;
}

export interface InitialState {
  isOpen: boolean;
  container: SnackbarItem[];
}

export interface SnackbarState extends Actions, InitialState {}

export type UseSnackbar = StateCreator<
  SnackbarState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
