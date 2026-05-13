import type { StatusButtonSubmit, TypeButtonSubmit } from "./component.types";

import type { StateCreator } from "zustand";

interface Actions {
  show: () => void;
  hide: () => void;
  setType: (type: TypeButtonSubmit) => void;
  setStatus: (state: StatusButtonSubmit) => void;
}

export interface InitialState {
  isVisible: boolean;
  type: TypeButtonSubmit;
  status: StatusButtonSubmit;
}

export interface ButtonSubmitState extends Actions, InitialState {}

export type UseButtonSubmit = StateCreator<
  ButtonSubmitState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
