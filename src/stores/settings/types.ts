import { Themes, Colors } from "../../config/constants/Colors";

export const themeOrder: readonly Themes[] = [
  "light",
  "oldschool",
  "peachy",
  "dark",
  "preworkout",
  "Corrupted",
] as const;

export type Units = "weight" | "length" | "volume" | "temperature";

export type WeightUnit = "kg" | "lbs";
export type LengthUnit = "cm" | "in";
export type DistanceUnit = "km" | "mi";
export type VolumeUnit = "ml" | "fl.oz";
export type TemperatureUnit = "°C" | "°F";

// Theme slice contract
export interface ThemeSlice {
  themeName: Themes;
  themeMode: "light" | "dark";
  theme: (typeof Colors)[Themes];
  setTheme: (themeName: Themes) => void;
  toggleTheme: () => void;
}

// Units slice contract
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

export interface GoalsSlice {
  weeklyGoal: number;
  setWeeklyGoal: (weeklyGoal: number) => void; // used in settings screen
  syncWeeklyGoal: (weeklyGoal: number) => void; // used only by workout store
}

export interface WorkoutSlice {
  defaultRestTime: number;
  setDefaultRestTime: (defaultRestTime: number) => void;
  startRestTimer: boolean;
  setStartRestTimer: (startRestTimer: boolean) => void;
  autoRestComplete: boolean;
  setAutoRestComplete: (autoRestComplete: boolean) => void;
  showRIR: boolean;
  setShowRIR: (showRIR: boolean) => void;
  showRPE: boolean;
  setShowRPE: (showRPE: boolean) => void;
}

export type HapticsMode = "off" | "gentle" | "on" | "max";

export type TimeFormat = "12h" | "24h";

export interface GeneralSlice {
  haptics: HapticsMode;
  setHaptics: (haptics: HapticsMode) => void;
  timeFormat: TimeFormat;
  setTimeFormat: (timeFormat: TimeFormat) => void;
}

// Settings store contract
export type SettingsStore = ThemeSlice &
  UnitsSlice &
  GoalsSlice &
  WorkoutSlice &
  GeneralSlice;
