import type { StateCreator } from "zustand";

interface Actions {
  open: (cardId: number) => void;
  close: () => void;
}

export type CardId = null | number;

export interface InitialState {
  isOpen: boolean;
  cardId: CardId;
}

export interface AppealModalState extends Actions, InitialState {}

export type UseAppealModal = StateCreator<
  AppealModalState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
