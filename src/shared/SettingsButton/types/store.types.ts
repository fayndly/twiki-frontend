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

export interface SettingsButtonState extends Actions, InitialState {}

export type UseSettingsButton = StateCreator<
  SettingsButtonState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
