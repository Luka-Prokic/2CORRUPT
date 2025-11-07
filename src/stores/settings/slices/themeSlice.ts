import { StateCreator } from "zustand";
import { SettingsStore, ThemeSlice, themeOrder } from "../types";
import { Colors } from "../../../config/constants/Colors";

/**
 * Theme slice: manages theme selection and toggling
 */
export const createThemeSlice: StateCreator<
  SettingsStore,
  [],
  [],
  ThemeSlice
> = (set, get) => ({
  themeName: "light",
  themeMode: "light",
  theme: Colors["light"],

  setTheme: (themeName: any) =>
    set({
      themeName,
      theme: Colors[themeName as keyof typeof Colors],
      themeMode: ["Corrupted", "dark", "preworkout"].includes(themeName)
        ? "dark"
        : "light",
    }),

  toggleTheme: () => {
    const currentIndex = themeOrder.indexOf(get().themeName);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newThemeName = themeOrder[nextIndex];
    const newThemeMode = ["Corrupted", "dark", "preworkout"].includes(
      newThemeName
    )
      ? "dark"
      : "light";
    set({
      themeName: newThemeName,
      theme: Colors[newThemeName],
      themeMode: newThemeMode,
    });
  },
});
