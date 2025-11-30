import { useSettingsStore } from "../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export type WorkoutSettingKey =
  | "startRestTimer"
  | "autoRestComplete"
  | "showRIR"
  | "showRPE"
  | "defaultRestTime";

interface BaseSettingConfig {
  key: WorkoutSettingKey;
  title: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

// Toggle setting
export interface ToggleSettingConfig extends BaseSettingConfig {
  type: "toggle";
  select: (state: ReturnType<typeof useSettingsStore.getState>) => boolean;
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: boolean
  ) => void;
}

// Number setting
export interface NumberSettingConfig extends BaseSettingConfig {
  type: "number";
  select: (state: ReturnType<typeof useSettingsStore.getState>) => number;
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: number
  ) => void;
}

// Increment setting (could be stepper type)
export interface IncrementSettingConfig extends BaseSettingConfig {
  type: "increment";
  select: (state: ReturnType<typeof useSettingsStore.getState>) => number;
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: number
  ) => void;
  increment: number;
}

export type WorkoutSettingConfig =
  | ToggleSettingConfig
  | NumberSettingConfig
  | IncrementSettingConfig;

export const workoutSettingsConfig: WorkoutSettingConfig[] = [
  {
    key: "startRestTimer",
    title: "settings.workout-settings.global-start-rest-time-title",
    description: "settings.workout-settings.global-start-rest-time-description",
    iconName: "stopwatch-outline",
    type: "toggle",
    select: (s) => s.startRestTimer,
    update: (s, v) => s.setStartRestTimer(v),
  },
  {
    key: "defaultRestTime",
    title: "settings.workout-settings.global-rest-time-title",
    description: "settings.workout-settings.global-rest-time-description",
    iconName: "stopwatch-outline",
    type: "increment",
    increment: 15,
    select: (s) => s.defaultRestTime,
    update: (s, v) => s.setDefaultRestTime(v),
  },
  {
    key: "autoRestComplete",
    title: "settings.workout-settings.auto-rest-complete-title",
    description: "settings.workout-settings.auto-rest-complete-description",
    iconName: "checkmark-done-outline",
    type: "toggle",
    select: (s) => s.autoRestComplete,
    update: (s, v) => s.setAutoRestComplete(v),
  },
  {
    key: "showRIR",
    title: "settings.workout-settings.global-rir-title",
    description: "settings.workout-settings.global-rir-description",
    iconName: "eye-off",
    type: "toggle",
    select: (s) => s.showRIR,
    update: (s, v) => s.setShowRIR(v),
  },
  {
    key: "showRPE",
    title: "settings.workout-settings.global-rpe-title",
    description: "settings.workout-settings.global-rpe-description",
    iconName: "eye-off",
    type: "toggle",
    select: (s) => s.showRPE,
    update: (s, v) => s.setShowRPE(v),
  },
];
