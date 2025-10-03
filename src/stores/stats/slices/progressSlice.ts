import { StateCreator } from "zustand";
import { StatsStore, ProgressSlice } from "../types";
import { getWeekStart, generateDateRange } from "../utils";

/**
 * Progress slice: handles weekly, monthly stats and progress data
 */
export const createProgressSlice: StateCreator<StatsStore, [], [], ProgressSlice> = (set, get) => ({
  getWeeklyStats: (startDate: Date = new Date()) => {
    const { completedWorkouts } = get();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30); // Get next 30 days
    
    const weeklyStats = [];
    const currentWeekStart = getWeekStart(startDate);
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekWorkouts = completedWorkouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= weekStart && workoutDate <= weekEnd;
      });
      
      const weekStat = {
        week: weekStart.toISOString().split('T')[0],
        workouts: weekWorkouts.length,
        totalDuration: weekWorkouts.reduce((sum, w) => sum + w.duration, 0),
        totalVolume: weekWorkouts.reduce((sum, w) => sum + w.totalVolume, 0),
        totalSets: weekWorkouts.reduce((sum, w) => sum + w.sets, 0),
        avgWorkoutDuration: weekWorkouts.length > 0 
          ? weekWorkouts.reduce((sum, w) => sum + w.duration, 0) / weekWorkouts.length 
          : 0,
      };
      
      weeklyStats.push(weekStat);
    }
    
    return weeklyStats;
  },

  getMonthlyStats: (startDate: Date = new Date()) => {
    const { completedWorkouts } = get();
    const monthlyStats = [];
    
    // Generate stats for last 12 months
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(startDate.getFullYear(), startDate.getMonth() - i, 1);
      const monthEnd = new Date(startDate.getFullYear(), startDate.getMonth() - i + 1, 0);
      
      const monthWorkouts = completedWorkouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= monthStart && workoutDate <= monthEnd;
      });
      
      const monthStat = {
        month: monthStart.toISOString().substring(0, 7), // YYYY-MM format
        workouts: monthWorkouts.length,
        totalDuration: monthWorkouts.reduce((sum, w) => sum + w.duration, 0),
        totalVolume: monthWorkouts.reduce((sum, w) => sum + w.totalVolume, 0),
        totalSets: monthWorkouts.reduce((sum, w) => sum + w.sets, 0),
        avgWorkoutDuration: monthWorkouts.length > 0 
          ? monthWorkouts.reduce((sum, w) => sum + w.duration, 0) / monthWorkouts.length 
          : 0,
        streak: 0, // TODO: Calculate streak logic
      };
      
      monthlyStats.push(monthStat);
    }
    
    return monthlyStats;
  },

  getProgressData: (period: 'week' | 'month' | 'year') => {
    const { completedWorkouts } = get();
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }
    
    const dates = generateDateRange(startDate, endDate);
    const workouts = dates.map(date => 
      completedWorkouts.filter(workout => 
        workout.date.toISOString().split('T')[0] === date
      ).length
    );
    
    const volume = dates.map(date => 
      completedWorkouts
        .filter(workout => workout.date.toISOString().split('T')[0] === date)
        .reduce((sum, workout) => sum + workout.totalVolume, 0)
    );
    
    const duration = dates.map(date => 
      completedWorkouts
        .filter(workout => workout.date.toISOString().split('T')[0] === date)
        .reduce((sum, workout) => sum + workout.duration, 0)
    );
    
    return { dates, workouts, volume, duration };
  },
});
