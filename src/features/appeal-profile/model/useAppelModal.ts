import type { InitialState, UseAppealModal, AppealModalState } from "../types";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  isOpen: false,
  cardId: null,
  from: null,
};

const appealModal: UseAppealModal = (set) => ({
  ...initialState,
  open: (cardId, from) =>
    set(() => ({ isOpen: true, cardId, from }), false, "open"),
  close: () =>
    set(() => ({ isOpen: false, cardId: null, from: null }), false, "close"),
});

const useAppealModal = create<AppealModalState>()(immer(devtools(appealModal)));

export const useIsOpenAppealModal = () =>
  useAppealModal((state) => state.isOpen);
export const useCardIdAppealModal = () =>
  useAppealModal((state) => state.cardId);
export const useFromAppealModal = () => useAppealModal((state) => state.from);
export const useOpenAppealModal = () => useAppealModal.getState().open;
export const useCloseAppealModal = () => useAppealModal.getState().close;
