import { StateCreator } from "zustand";
import { SettingsStore, ThemeSlice, themeOrder } from "../types";
import Colors from "../../../config/constants/Colors";

/**
 * Theme slice: manages theme selection and toggling
 */
export const createThemeSlice: StateCreator<SettingsStore, [], [], ThemeSlice> = (set, get) => ({
  themeName: "light",
  theme: Colors["light"],

  setTheme: (themeName: any) => set({ themeName, theme: Colors[themeName as keyof typeof Colors] }),

  toggleTheme: () => {
    const currentIndex = themeOrder.indexOf(get().themeName);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newThemeName = themeOrder[nextIndex];
    set({ themeName: newThemeName, theme: Colors[newThemeName] });
  },
});
