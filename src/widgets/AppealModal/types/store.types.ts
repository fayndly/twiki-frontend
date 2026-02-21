import type { StateCreator } from "zustand";

export type From = "likesCards" | "viewingCards";

interface Actions {
  open: (cardId: number, from: From) => void;
  close: () => void;
}

export type CardId = null | number;

export interface InitialState {
  isOpen: boolean;
  cardId: CardId;
  from: From | null;
}

export interface AppealModalState extends Actions, InitialState {}

export type UseAppealModal = StateCreator<
  AppealModalState,
  [["zustand/immer", never], ["zustand/devtools", never]]
>;
