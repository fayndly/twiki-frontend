import type { StateCreator } from "zustand";

interface Actions {
  show: () => void;
  hide: () => void;
  check: (forTests?: boolean) => void;
}

export interface InitialState {
  isVisible: boolean;
  isTgButtonSupporting: boolean;
}

export interface BackButtonState extends Actions, InitialState {}

export type UseBackButton = StateCreator<
  BackButtonState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
