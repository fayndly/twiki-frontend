import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { InitialState, useDirtyForms, dirtyFormsState } from "../types";

const initialState: InitialState = {
  isFormFiltersDirty: false,
  isFormProfileUpdateDirty: false,
  isFormProfileCreateDirty: false,
};

const dirtyForms: useDirtyForms = (set) => ({
  ...initialState,
  setFormDirty: (key, value) =>
    set(
      (state) => {
        switch (key) {
          case "filters":
            state.isFormFiltersDirty = value;

            break;
          case "profileCreate":
            state.isFormProfileCreateDirty = value;
            break;
          case "profileUpdate":
            state.isFormProfileUpdateDirty = value;
            break;
        }
      },
      false,
      "delete",
    ),
});

const useDirtyForms = create<dirtyFormsState>()(immer(devtools(dirtyForms)));

export const useSetFormDirty = () => useDirtyForms.getState().setFormDirty;
export const useIsFormFiltersDirty = () =>
  useDirtyForms((state) => state.isFormFiltersDirty);
export const useIsFormProfileUpdateDirty = () =>
  useDirtyForms((state) => state.isFormProfileUpdateDirty);
export const useIsFormProfileCreateDirty = () =>
  useDirtyForms((state) => state.isFormProfileCreateDirty);
