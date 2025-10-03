import { StateCreator } from "zustand";
import { UIStore, WorkoutViewSlice } from "../types";

/**
 * Workout view slice: manages home screen workout view state
 */
export const createWorkoutViewSlice: StateCreator<UIStore, [], [], WorkoutViewSlice> = (set, get) => ({
  isWorkoutView: false,

  setWorkoutView: (isActive: boolean) => set({ isWorkoutView: isActive }),

  toggleWorkoutView: () => set((state) => ({ isWorkoutView: !state.isWorkoutView })),
});
