import { StateCreator } from "zustand";
import { StatsStore, GeneralSlice } from "../types";

/**
 * General stats utilities slice: reset and cleanup functions
 */
export const createGeneralSlice: StateCreator<StatsStore, [], [], GeneralSlice> = (set, get) => ({
  resetStats: () => set({
    completedWorkouts: [],
    weeklyStats: [],
    monthlyStats: [],
    currentStreak: 0,
    longestStreak: 0,
    totalWorkouts: 0,
    totalDuration: 0,
    totalVolume: 0,
  }),
});
