import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { InitialState, UseAppealModal, AppealModalState } from "../types";

const initialState: InitialState = {
  isOpen: false,
  cardId: null,
};

const appealModal: UseAppealModal = (set) => ({
  ...initialState,
  open: (cardId) => set(() => ({ isOpen: true, cardId }), false, "open"),
  close: () => set(() => ({ isOpen: false, cardId: null }), false, "close"),
});

const useAppealModal = create<AppealModalState>()(immer(devtools(appealModal)));

export const useIsOpenAppealModal = () =>
  useAppealModal((state) => state.isOpen);
export const useCardIdAppealModal = () =>
  useAppealModal((state) => state.cardId);
export const useOpenAppealModal = () => useAppealModal.getState().open;
export const useCloseAppealModal = () => useAppealModal.getState().close;
