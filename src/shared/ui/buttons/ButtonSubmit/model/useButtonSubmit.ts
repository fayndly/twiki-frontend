import type {
  InitialState,
  UseButtonSubmit,
  ButtonSubmitState,
} from "../types";
import { getParams } from "../helpers";

import { mainButton } from "@tma.js/sdk-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { supportHapticFeedback } from "@/shared/helpers";

const initialState: InitialState = {
  isVisible: false,
  type: "tg",
  status: "void",
};

const mainButtonStateState: UseButtonSubmit = (set) => ({
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

const useButtonSubmit = create<ButtonSubmitState>()(
  immer(devtools(mainButtonStateState)),
);

export const useIsVisibleButtonSubmit = () =>
  useButtonSubmit((state) => state.isVisible);
export const useStatusButtonSubmit = () =>
  useButtonSubmit((state) => state.status);
export const useTypeButtonSubmit = () => useButtonSubmit((state) => state.type);
export const useShowButtonSubmit = () => useButtonSubmit.getState().show;
export const useHideButtonSubmit = () => useButtonSubmit.getState().hide;
export const useSetTypeButtonSubmit = () => useButtonSubmit.getState().setType;
export const useSetStatusButtonSubmit = () =>
  useButtonSubmit.getState().setStatus;
