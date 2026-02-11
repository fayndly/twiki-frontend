import type { StateCreator } from "zustand";
import type { StatusSubmitButton, TypeSubmitButton } from "./component.types";

interface Actions {
  show: () => void;
  hide: () => void;
  setType: (type: TypeSubmitButton) => void;
  setStatus: (state: StatusSubmitButton) => void;
}

export interface InitialState {
  isVisible: boolean;
  type: TypeSubmitButton | null;
  status: StatusSubmitButton;
}

export interface SubmitButtonState extends Actions, InitialState {}

export type UseSubmitButton = StateCreator<
  SubmitButtonState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
