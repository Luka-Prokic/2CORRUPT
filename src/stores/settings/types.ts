// Types for the modular settings store

import { Themes, Colors } from "../../config/constants/Colors";

export type SettingsStore = ThemeSlice & GeneralSlice & UnitsSlice;

// Theme slice contract
export interface ThemeSlice {
  themeName: Themes;
  themeMode: "light" | "dark";
  theme: (typeof Colors)[Themes];
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
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
export type LengthUnit = "cm" | "in";
export type DistanceUnit = "km" | "mi";
export type VolumeUnit = "ml" | "fl.oz";
export type TemperatureUnit = "°C" | "°F";
export interface UnitsSlice {
  units: {
    weight: WeightUnit;
    length: LengthUnit;
    distance: DistanceUnit;
    volume: VolumeUnit;
    temperature: TemperatureUnit;
  };
  setUnits: (units: {
    weight: WeightUnit;
    length: LengthUnit;
    distance: DistanceUnit;
    volume: VolumeUnit;
    temperature: TemperatureUnit;
  }) => void;
}
