import type { InitialState, UseSnackbar, SnackbarState } from "../types";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isOpen: false,
  container: [],
};

const snackbar: UseSnackbar = (set) => ({
  ...initialState,
  open: () => set(() => ({ isOpen: true }), false, "open"),
  close: () => set(() => ({ isOpen: false }), false, "close"),
  delete: (id) =>
    set(
      (state) => {
        const index = state.container.findIndex((item) => item.id === id);

        if (index !== -1) state.container.splice(index, 1);
      },
      false,
      "delete",
    ),
  add: (header, description, type, retryFunction, ...args) =>
    set(
      (state) => {
        const id = Date.now();

        state.container.push({
          id,
          header,
          description,
          type,
          retryFunction,
          args,
        });
      },
      false,
      "add",
    ),
});

const useSnackbarStore = create<SnackbarState>()(immer(devtools(snackbar)));

export const useContainerSnackbar = () =>
  useSnackbarStore((state) => state.container);
export const getAddSnackbar = () => useSnackbarStore.getState().add;
export const useAddSnackbar = () => useSnackbarStore.getState().add;
export const useDeleteSnackbar = () => useSnackbarStore.getState().delete;
