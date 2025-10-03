import { StateCreator } from "zustand";
import { UIStore, LoadingSlice } from "../types";

/**
 * Loading slice: manages loading states
 */
export const createLoadingSlice: StateCreator<UIStore, [], [], LoadingSlice> = (set, get) => ({
  isLoading: false,

  setLoading: (loading: boolean) => set({ isLoading: loading }),
});
