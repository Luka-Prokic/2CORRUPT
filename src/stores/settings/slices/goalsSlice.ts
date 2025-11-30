import { StateCreator } from "zustand";
import { SettingsStore, GoalsSlice } from "../types";
import { useWorkoutStore } from "../../workout/useWorkoutStore";
import { NoSplit } from "../../workout";

export const createGoalsSlice: StateCreator<
  SettingsStore,
  [],
  [],
  GoalsSlice
> = (set, get) => ({
  weeklyGoal: NoSplit.activeLength,
  setWeeklyGoal: (newGoal) => {
    const { updateWeeklyGoal } = useWorkoutStore.getState();
    updateWeeklyGoal(newGoal);
  },
  syncWeeklyGoal: (weeklyGoal: number) => {
    set((state) => ({ ...state, weeklyGoal: weeklyGoal }));
  },
});
