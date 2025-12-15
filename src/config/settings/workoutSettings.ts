import { SettingConfig } from "./types";

export type WorkoutSettingKey =
  | "startRestTimer"
  | "autoRestComplete"
  | "showRIR"
  | "showRPE"
  | "defaultRestTime";

export const workoutSettingsConfig: SettingConfig[] = [
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
    min: 0,
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
