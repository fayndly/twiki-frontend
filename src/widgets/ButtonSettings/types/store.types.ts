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

export interface ButtonSettingsState extends Actions, InitialState {}

export type UseButtonSettings = StateCreator<
  ButtonSettingsState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
