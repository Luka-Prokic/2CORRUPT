import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Themes } from "../config/constants/Colors";
import Colors from "../config/constants/Colors";

interface ThemeState {
  themeName: Themes;
  theme: (typeof Colors)[Themes];
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
}

const themeOrder: Themes[] = [
  "light",
  "oldschool",
  "peachy",
  "dark",
  "preworkout",
  "Corrupted",
];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeName: "light",
      theme: Colors["light"],
      setTheme: (themeName) => set({ themeName, theme: Colors[themeName] }),
      toggleTheme: () => {
        const currentIndex = themeOrder.indexOf(get().themeName);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        const newThemeName = themeOrder[nextIndex];
        set({ themeName: newThemeName, theme: Colors[newThemeName] });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
