import { StateCreator } from "zustand";
import { SettingsStore, LanguageSlice } from "../types";

/**
 * Language slice: manages language selection and toggling
 */
export const createLanguageSlice: StateCreator<SettingsStore, [], [], LanguageSlice> = (set, get) => ({
  language: 'en',

  setLanguage: (language: any) => set({ language }),

  toggleLanguage: () => {
    const currentLanguage = get().language;
    const newLanguage = currentLanguage === 'en' ? 'rs' : 'en';
    set({ language: newLanguage });
  },
});
