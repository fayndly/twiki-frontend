export interface InitialState {
  isFormFiltersDirty: boolean;
  isFormProfileUpdateDirty: boolean;
  isFormProfileCreateDirty: boolean;
}

import type { StateCreator } from "zustand";

type KeysFormDirty = "filters" | "profileUpdate" | "profileCreate";

interface Actions {
  setFormDirty: (key: KeysFormDirty, value: boolean) => void;
}

export interface dirtyFormsState extends Actions, InitialState {}

export type useDirtyForms = StateCreator<
  dirtyFormsState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
