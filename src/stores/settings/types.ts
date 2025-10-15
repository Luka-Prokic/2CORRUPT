// Types for the modular settings store

import { Themes, Colors } from "../../config/constants/Colors";

export type Language = "en" | "rs";

export type SettingsStore = ThemeSlice &
  LanguageSlice &
  GeneralSlice &
  UnitsSlice;

// Theme slice contract
export interface ThemeSlice {
  themeName: Themes;
  themeMode: "light" | "dark";
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

export type WeightUnit = "kg" | "lbs";

export interface UnitsSlice {
  units: {
    weight: WeightUnit;
  };
  setUnits: (units: { weight: WeightUnit }) => void;
}
