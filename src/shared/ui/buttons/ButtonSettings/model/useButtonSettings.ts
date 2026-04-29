import type {
  InitialState,
  UseButtonSettings,
  ButtonSettingsState,
} from "../types";

import { settingsButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isVisible: false,
  isTgButtonSupporting: false,
};

const ButtonSettingsState: UseButtonSettings = (set) => ({
  ...initialState,
  show: () =>
    set(
      (state) => {
        if (state.isTgButtonSupporting) {
          settingsButton.show();
        }

        state.isVisible = true;
      },
      false,
      "show",
    ),
  hide: () =>
    set(
      (state) => {
        if (state.isTgButtonSupporting) {
          settingsButton.hide();
        }

        state.isVisible = false;
      },
      false,
      "hide",
    ),
  check: (forTests = true) =>
    set(
      (state) => {
        if (settingsButton.isSupported() && !settingsButton.isMounted()) {
          settingsButton.mount();
        }
        state.isTgButtonSupporting =
          settingsButton.isSupported() &&
          settingsButton.isMounted() &&
          forTests;
      },
      false,
      "check",
    ),
});

const useButtonSettings = create<ButtonSettingsState>()(
  immer(devtools(ButtonSettingsState)),
);

export const useIsVisibleButtonSettings = () =>
  useButtonSettings((state) => state.isVisible);
export const useIsTgButtonSettingsSupporting = () =>
  useButtonSettings((state) => state.isTgButtonSupporting);
export const useShowButtonSettings = () => useButtonSettings.getState().show;
export const useHideButtonSettings = () => useButtonSettings.getState().hide;
export const useCheckButtonSettings = () => useButtonSettings.getState().check;
