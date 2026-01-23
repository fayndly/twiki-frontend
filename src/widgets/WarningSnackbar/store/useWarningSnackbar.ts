import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
  InitialState,
  UseWarningSnackbar,
  WarningSnackbarState,
} from "../types";

const initialState: InitialState = {
  isOpen: false,
  container: [],
};

const warningSnackbar: UseWarningSnackbar = (set) => ({
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
  add: (header, description, retryFunction, ...args) =>
    set(
      (state) => {
        const id = Date.now();

        state.container.push({
          id: id,
          header,
          description,
          retryFunction,
          args,
        });
      },
      false,
      "add",
    ),
});

const useWarningSnackbarStore = create<WarningSnackbarState>()(
  immer(devtools(warningSnackbar)),
);
export const useContainerWarningSnackbar = () =>
  useWarningSnackbarStore((state) => state.container);
export const getAddWarningSnackbar = () =>
  useWarningSnackbarStore.getState().add;
export const useAddWarningSnackbar = () =>
  useWarningSnackbarStore.getState().add;
export const useDeleteWarningSnackbar = () =>
  useWarningSnackbarStore.getState().delete;
