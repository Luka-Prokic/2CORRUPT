// Types for the modular settings store

import { Themes } from '../../config/constants/Colors';
import Colors from '../../config/constants/Colors';

export type Language = 'en' | 'rs';

export type SettingsStore = ThemeSlice & LanguageSlice & GeneralSlice;

// Theme slice contract
export interface ThemeSlice {
  themeName: Themes;
  theme: (typeof Colors)[Themes];
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
}

// Language slice contract
export interface LanguageSlice {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

// General settings slice contract
export interface GeneralSlice {
  resetToDefaults: () => void;
}

export const themeOrder: readonly Themes[] = [
  "light",
  "oldschool", 
  "peachy",
  "dark",
  "preworkout",
  "Corrupted",
] as const;
