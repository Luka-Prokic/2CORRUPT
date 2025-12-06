import { StateCreator } from "zustand";
import { HapticsMode, SettingsStore, TimeFormat, GeneralSlice } from "../types";

export const createGeneralSlice: StateCreator<
  SettingsStore,
  [],
  [],
  GeneralSlice
> = (set, get) => ({
  haptics: "on",
  timeFormat: "24h",
  setHaptics: (haptics: HapticsMode) => set({ haptics }),
  setTimeFormat: (timeFormat: TimeFormat) => set({ timeFormat }),
});
