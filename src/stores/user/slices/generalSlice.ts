import { StateCreator } from "zustand";
import { UserStore, GeneralSlice } from "../types";

/**
 * General user utilities slice: reset and cleanup functions
 */
export const createGeneralSlice: StateCreator<UserStore, [], [], GeneralSlice> = (set, get) => ({
  resetUser: () => set({ 
    user: null, 
    isLoggedIn: false, 
    isLoading: false 
  }),
});
