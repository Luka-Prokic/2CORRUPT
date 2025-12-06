import { useSettingsStore } from "../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export interface BaseSettingConfig {
  key: string;
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

//  setting
export interface SwitchSettingConfig extends BaseSettingConfig {
  type: "switch";
  options: string[];
  select: (state: ReturnType<typeof useSettingsStore.getState>) => string;
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: string
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

// Slider setting
export interface SliderSettingConfig extends BaseSettingConfig {
  type: "slider";
  select: (state: ReturnType<typeof useSettingsStore.getState>) => number;
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: number
  ) => void;
  min: number;
  max: number;
  step: number;
}

// Range setting
export interface RangeSettingConfig extends BaseSettingConfig {
  type: "range";
  min: number;
  max: number;
  select: (
    state: ReturnType<typeof useSettingsStore.getState>
  ) => [number, number];
  update: (
    state: ReturnType<typeof useSettingsStore.getState>,
    value: [number, number]
  ) => void;
}

// Segmented setting
export interface SegmentedSettingConfig<T extends string = string>
  extends BaseSettingConfig {
  type: "segmented";
  options: T[];
  select: (state: ReturnType<typeof useSettingsStore.getState>) => T;
  update: (state: ReturnType<typeof useSettingsStore.getState>, value: T) => void;
}


export type SettingConfig =
  | ToggleSettingConfig
  | NumberSettingConfig
  | IncrementSettingConfig
  | SliderSettingConfig
  | RangeSettingConfig
  | SwitchSettingConfig
  | SegmentedSettingConfig;
