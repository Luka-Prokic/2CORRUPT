import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useThemeStore } from './themeStore';
import { useLanguageStore } from './languageStore';
import { Themes } from '../config/constants/Colors';

type Language = 'en' | 'rs';

interface AppSettingsState {
  // Theme settings
  themeName: Themes;
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
  
  // Language settings
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  
  // Combined actions
  resetToDefaults: () => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      // Theme state
      themeName: "light",
      setTheme: (themeName) => set({ themeName }),
      toggleTheme: () => {
        const themeOrder: Themes[] = ["light", "oldschool", "peachy", "dark", "preworkout", "Corrupted"];
        const currentIndex = themeOrder.indexOf(get().themeName);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        set({ themeName: themeOrder[nextIndex] });
      },
      
      // Language state
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => {
        const currentLanguage = get().language;
        const newLanguage = currentLanguage === 'en' ? 'rs' : 'en';
        set({ language: newLanguage });
      },
      
      // Combined actions
      resetToDefaults: () => set({ themeName: "light", language: 'en' }),
    }),
    {
      name: 'app-settings-storage',
    }
  )
);
