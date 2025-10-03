import { StateCreator } from "zustand";
import { StatsStore, CalculationsSlice } from "../types";

/**
 * Calculations slice: handles streak and total calculations
 */
export const createCalculationsSlice: StateCreator<StatsStore, [], [], CalculationsSlice> = (set, get) => ({
  currentStreak: 0,
  longestStreak: 0,
  totalWorkouts: 0,
  totalDuration: 0,
  totalVolume: 0,

  getCurrentStreak: () => {
    const { completedWorkouts } = get();
    if (completedWorkouts.length === 0) return 0;
    
    // Sort workouts by date (most recent first)
    const sortedWorkouts = [...completedWorkouts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if today has a workout
    const todayWorkout = sortedWorkouts.find(workout => {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate.getTime() === today.getTime();
    });
    
    if (todayWorkout) {
      streak = 1;
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - 1);
      
      while (true) {
        const hasWorkout = sortedWorkouts.find(workout => {
          const workoutDate = new Date(workout.date);
          workoutDate.setHours(0, 0, 0, 0);
          return workoutDate.getTime() === currentDate.getTime();
        });
        
        if (hasWorkout) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
    
    return streak;
  },

  getLongestStreak: () => {
    const { completedWorkouts } = get();
    if (completedWorkouts.length === 0) return 0;
    
    // Sort workouts by date
    const sortedWorkouts = [...completedWorkouts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let longestStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedWorkouts.length; i++) {
      const prevDate = new Date(sortedWorkouts[i - 1].date);
      const currDate = new Date(sortedWorkouts[i].date);
      const dayDiff = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    
    return Math.max(longestStreak, currentStreak);
  },
});
