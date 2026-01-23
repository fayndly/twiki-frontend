import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { InitialState, UseAppelModal, AppelModalState } from "../types";

const initialState: InitialState = {
  isOpen: false,
  cardId: null,
};

const AppelModal: UseAppelModal = (set) => ({
  ...initialState,
  open: (cardId) => set(() => ({ isOpen: true, cardId }), false, "open"),
  close: () => set(() => ({ isOpen: false, cardId: null }), false, "close"),
});

const useAppelModal = create<AppelModalState>()(immer(devtools(AppelModal)));

export const useIsOpenAppelModal = () => useAppelModal((state) => state.isOpen);
export const useCardIdAppelModal = () => useAppelModal((state) => state.cardId);
export const useOpenAppelModal = () => useAppelModal.getState().open;
export const useCloseAppelModal = () => useAppelModal.getState().close;
