import { StateCreator } from "zustand";
import { UIStore, ModalSlice } from "../types";

/**
 * Modal slice: manages modal states and operations
 */
export const createModalSlice: StateCreator<UIStore, [], [], ModalSlice> = (set, get) => ({
  isModalOpen: false,
  modalType: null,

  openModal: (type: string) => set({ isModalOpen: true, modalType: type }),

  closeModal: () => set({ isModalOpen: false, modalType: null }),
});
