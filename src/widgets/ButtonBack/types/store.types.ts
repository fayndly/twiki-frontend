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

export interface ButtonBackState extends Actions, InitialState {}

export type UseButtonBack = StateCreator<
  ButtonBackState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
