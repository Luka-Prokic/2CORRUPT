import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Themes } from '../config/constants/Colors';

interface ThemeState {
  themeName: Themes;
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
}

const themeOrder: Themes[] = ["light", "oldschool", "peachy", "dark", "preworkout", "Corrupted"];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeName: "light",
      setTheme: (themeName) => set({ themeName }),
      toggleTheme: () => {
        const currentIndex = themeOrder.indexOf(get().themeName);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        set({ themeName: themeOrder[nextIndex] });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
