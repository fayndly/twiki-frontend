import type { StateCreator } from "zustand";

interface Actions {
  open: (cardId: number) => void;
  close: () => void;
}

export interface InitialState {
  isOpen: boolean;
  cardId: null | number;
}

export interface AppelModalState extends Actions, InitialState {}

export type UseAppelModal = StateCreator<
  AppelModalState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
