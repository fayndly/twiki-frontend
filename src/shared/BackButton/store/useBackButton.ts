import type { InitialState, UseBackButton, BackButtonState } from "../types";

import { backButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isVisible: false,
  isTgButtonSupporting: false,
};

const backButtonState: UseBackButton = (set) => ({
  ...initialState,
  show: () =>
    set(
      (state) => {
        state.isTgButtonSupporting && backButton.show();

        state.isVisible = true;
      },
      false,
      "show",
    ),
  hide: () =>
    set(
      (state) => {
        state.isTgButtonSupporting && backButton.hide();

        state.isVisible = false;
      },
      false,
      "hide",
    ),
  check: (forTests = true) =>
    set(
      (state) => {
        if (backButton.isSupported() && !backButton.isMounted()) {
          backButton.mount();
        }
        state.isTgButtonSupporting =
          backButton.isSupported() && backButton.isMounted() && forTests;
      },
      false,
      "check",
    ),
});

const useBackButton = create<BackButtonState>()(
  immer(devtools(backButtonState)),
);

export const useIsVisibleBackButton = () =>
  useBackButton((state) => state.isVisible);
export const useIsTgButtonSupporting = () =>
  useBackButton((state) => state.isTgButtonSupporting);
export const useShowBackButton = () => useBackButton.getState().show;
export const useHideBackButton = () => useBackButton.getState().hide;
export const useCheckBackButton = () => useBackButton.getState().check;
