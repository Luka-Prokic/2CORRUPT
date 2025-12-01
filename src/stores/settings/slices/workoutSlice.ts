import { StateCreator } from "zustand";
import { SettingsStore, WorkoutSlice } from "../types";

export const createWorkoutSlice: StateCreator<
  SettingsStore,
  [],
  [],
  WorkoutSlice
> = (set, get) => ({
  defaultRestTime: 120,
  setDefaultRestTime: (defaultRestTime) => {
    if (defaultRestTime < 0 || defaultRestTime > 36000) return;

    set((state) => ({ ...state, defaultRestTime }));
  },
  startRestTimer: true,
  setStartRestTimer: (startRestTimer) =>
    set((state) => ({ ...state, startRestTimer })),
  autoRestComplete: false,
  setAutoRestComplete: (autoRestComplete) =>
    set((state) => ({ ...state, autoRestComplete })),
  showRIR: false,
  setShowRIR: (showRIR) => set((state) => ({ ...state, showRIR })),
  showRPE: false,
  setShowRPE: (showRPE) => set((state) => ({ ...state, showRPE })),
});
