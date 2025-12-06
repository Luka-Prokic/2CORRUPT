import { StateCreator } from "zustand";
import { HapticsMode, SettingsStore, TimeFormat, AppSlice } from "../types";

export const createAppSlice: StateCreator<SettingsStore, [], [], AppSlice> = (
  set,
  get
) => ({
  haptics: "on",
  timeFormat: "24h",
  setHaptics: (haptics: HapticsMode) => set({ haptics }),
  setTimeFormat: (timeFormat: TimeFormat) => set({ timeFormat }),
});
