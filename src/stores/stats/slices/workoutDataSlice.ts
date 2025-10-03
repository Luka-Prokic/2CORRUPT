import { StateCreator } from "zustand";
import { StatsStore, WorkoutDataSlice } from "../types";

/**
 * Workout data slice: manages workout statistics CRUD operations
 */
export const createWorkoutDataSlice: StateCreator<StatsStore, [], [], WorkoutDataSlice> = (set, get) => ({
  completedWorkouts: [],
  weeklyStats: [],
  monthlyStats: [],

  addWorkoutStats: (statsData: any) => {
    const newStats = {
      ...statsData,
      id: Date.now().toString(),
    };
    
    set((state) => {
      const updatedWorkouts = [...state.completedWorkouts, newStats];
      
      // Recalculate totals
      const totals = updatedWorkouts.reduce(
        (acc, workout) => ({
          totalWorkouts: acc.totalWorkouts + 1,
          totalDuration: acc.totalDuration + workout.duration,
          totalVolume: acc.totalVolume + workout.totalVolume,
        }),
        { totalWorkouts: 0, totalDuration: 0, totalVolume: 0 }
      );
      
      return {
        completedWorkouts: updatedWorkouts,
        ...totals,
        currentStreak: get().getCurrentStreak(),
        longestStreak: get().getLongestStreak(),
      };
    });
  },

  updateWorkoutStats: (id: string, updates: any) => {
    set((state) => ({
      completedWorkouts: state.completedWorkouts.map(workout =>
        workout.id === id ? { ...workout, ...updates } : workout
      ),
    }));
  },

  deleteWorkoutStats: (id: string) => {
    set((state) => ({
      completedWorkouts: state.completedWorkouts.filter(workout => workout.id !== id),
    }));
  },
});
