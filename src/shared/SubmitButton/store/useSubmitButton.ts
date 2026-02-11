import { supportHapticFeedback } from "@/shared/helpers";
import type {
  InitialState,
  UseSubmitButton,
  SubmitButtonState,
} from "../types";

import { mainButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getParams } from "../helpers";

const initialState: InitialState = {
  isVisible: false,
  type: null,
  status: "void",
};

const mainButtonStateState: UseSubmitButton = (set) => ({
  ...initialState,
  show: () =>
    set(
      (state) => {
        state.type === "tg" && mainButton.show();

        state.isVisible = true;
      },
      false,
      "show",
    ),
  hide: () =>
    set(
      (state) => {
        state.type === "tg" && mainButton.hide();

        state.isVisible = false;
      },
      false,
      "hide",
    ),
  setType: (type) =>
    set(
      (state) => {
        state.type = type;
      },
      false,
      "hide",
    ),
  setStatus: (status) =>
    set(
      (state) => {
        if (status === "error") supportHapticFeedback("error");
        if (status === "success") supportHapticFeedback("success");

        if (state.type === "tg") {
          const params = getParams();

          mainButton.setParams(params[status]);
        }

        state.status = status;
      },
      false,
      "hide",
    ),
});

const useSubmitButton = create<SubmitButtonState>()(
  immer(devtools(mainButtonStateState)),
);

export const useIsVisibleSubmitButton = () =>
  useSubmitButton((state) => state.isVisible);
export const useStatusSubmitButton = () =>
  useSubmitButton((state) => state.status);
export const useTypeSubmitButton = () => useSubmitButton((state) => state.type);
export const useShowSubmitButton = () => useSubmitButton.getState().show;
export const useHideSubmitButton = () => useSubmitButton.getState().hide;
export const useSetTypeSubmitButton = () => useSubmitButton.getState().setType;
export const useSetStatusSubmitButton = () =>
  useSubmitButton.getState().setStatus;
