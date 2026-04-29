import type { InitialState, UseButtonBack, ButtonBackState } from "../types";

import { backButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isVisible: false,
  isTgButtonSupporting: false,
};

const backButtonState: UseButtonBack = (set) => ({
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

const useButtonBack = create<ButtonBackState>()(
  immer(devtools(backButtonState)),
);

export const useIsVisibleButtonBack = () =>
  useButtonBack((state) => state.isVisible);
export const useIsTgButtonBackSupporting = () =>
  useButtonBack((state) => state.isTgButtonSupporting);
export const useShowButtonBack = () => useButtonBack.getState().show;
export const useHideButtonBack = () => useButtonBack.getState().hide;
export const useCheckButtonBack = () => useButtonBack.getState().check;
