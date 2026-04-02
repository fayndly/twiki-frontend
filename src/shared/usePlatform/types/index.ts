import type { StateCreator } from "zustand";

export interface InitialState {
  platform?: "android" | "ios" | "macos" | "tdesktop" | "weba" | "web";
  platformForApp?: "ios" | "base";
  isBase?: boolean;
}

interface Actions {
  set: (platform: string) => void;
}

export interface PlatformState extends Actions, InitialState {}

export type UsePlatform = StateCreator<
  PlatformState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
