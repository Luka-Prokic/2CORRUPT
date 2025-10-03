import { StateCreator } from "zustand";
import { UIStore, GeneralSlice } from "../types";

/**
 * General UI utilities slice: reset and cleanup functions
 */
export const createGeneralSlice: StateCreator<UIStore, [], [], GeneralSlice> = (set, get) => ({
  resetUI: () => set({
    isWorkoutView: false,
    isModalOpen: false,
    modalType: null,
    activeWidgetId: null,
    isWidgetEditing: false,
    currentScreen: 'Home',
    isLoading: false,
  }),
});
