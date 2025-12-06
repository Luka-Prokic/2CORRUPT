import { HapticsMode, TimeFormat } from "../../stores/settingsStore";
import { SettingConfig } from "./types";

export type GeneralSettingKey = "haptics" | "timeFormat";

export const generalSettingsConfig: SettingConfig[] = [
  {
    key: "haptics",
    title: "settings.general-settings.haptics-title",
    description: "settings.general-settings.haptics-description",
    iconName: "color-wand-outline",
    type: "segmented",
    options: ["off", "gentle", "on", "max"] as HapticsMode[],
    select: (s) => s.haptics,
    update: (s, v) => s.setHaptics(v as HapticsMode),
  },
  {
    key: "timeFormat",
    title: "settings.general-settings.time-format-title",
    description: "settings.general-settings.time-format-description",
    iconName: "time-outline",
    type: "switch",
    options: ["12h", "24h"] as TimeFormat[],
    select: (s) => s.timeFormat,
    update: (s, v) => s.setTimeFormat(v as TimeFormat),
  },
];
