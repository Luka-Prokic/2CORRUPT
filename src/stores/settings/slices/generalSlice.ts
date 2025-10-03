import { StateCreator } from "zustand";
import { SettingsStore, GeneralSlice } from "../types";
import Colors from "../../../config/constants/Colors";

/**
 * General settings slice: combined actions and utilities
 */
export const createGeneralSlice: StateCreator<SettingsStore, [], [], GeneralSlice> = (set, get) => ({
  resetToDefaults: () => set({ 
    themeName: "light", 
    theme: Colors["light"],
    language: 'en' 
  }),
});
