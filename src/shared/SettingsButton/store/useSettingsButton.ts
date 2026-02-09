import type {
  InitialState,
  UseSettingsButton,
  SettingsButtonState,
} from "../types";

import { settingsButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isVisible: false,
  isTgButtonSupporting: false,
};

const settingsButtonState: UseSettingsButton = (set) => ({
  ...initialState,
  show: () =>
    set(
      (state) => {
        state.isTgButtonSupporting && settingsButton.show();

        state.isVisible = true;
      },
      false,
      "show",
    ),
  hide: () =>
    set(
      (state) => {
        state.isTgButtonSupporting && settingsButton.hide();

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

const useSettingsButton = create<SettingsButtonState>()(
  immer(devtools(settingsButtonState)),
);

export const useIsVisibleSettingsButton = () =>
  useSettingsButton((state) => state.isVisible);
export const useIsTgSettingsButtonSupporting = () =>
  useSettingsButton((state) => state.isTgButtonSupporting);
export const useShowSettingsButton = () => useSettingsButton.getState().show;
export const useHideSettingsButton = () => useSettingsButton.getState().hide;
export const useCheckSettingsButton = () => useSettingsButton.getState().check;
