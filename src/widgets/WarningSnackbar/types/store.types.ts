import type { StateCreator } from "zustand";

type RetryFunction<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => Promise<TResult>;

// Аргументы, с которыми нужно повторно вызвать retryFunction
type RetryArgs = any[];

interface Actions {
  open: () => void;
  close: () => void;
  add: (
    header: string,
    description: string,
    retryFunction: RetryFunction<any, any>,
    ...args: RetryArgs
  ) => void;
  delete: (id: number) => void;
}

interface SnackbarItem {
  id: number;
  header: string;
  description: string;
  retryFunction?: RetryFunction<any, any>;
  args?: RetryArgs;
}

export interface InitialState {
  isOpen: boolean;
  container: SnackbarItem[];
}

export interface WarningSnackbarState extends Actions, InitialState {}

export type UseWarningSnackbar = StateCreator<
  WarningSnackbarState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
