// Types for the modular stats store

export interface WorkoutStats {
  readonly id: string;
  readonly date: Date;
  readonly duration: number; // in minutes
  readonly exercises: number;
  readonly sets: number;
  readonly totalVolume: number; // total weight lifted
  readonly calories: number;
  readonly notes?: string;
}

export interface WeeklyStats {
  readonly week: string;
  readonly workouts: number;
  readonly totalDuration: number;
  readonly totalVolume: number;
  readonly totalSets: number;
  readonly avgWorkoutDuration: number;
}

export interface MonthlyStats {
  readonly month: string;
  readonly workouts: number;
  readonly totalDuration: number;
  readonly totalVolume: number;
  readonly totalSets: number;
  readonly avgWorkoutDuration: number;
  readonly streak: number; // consecutive days
}

export interface ProgressData {
  readonly dates: string[];
  readonly workouts: number[];
  readonly volume: number[];
  readonly duration: number[];
}

export type StatsStore = WorkoutDataSlice & CalculationsSlice & ProgressSlice & GeneralSlice;

// Workout data management slice contract
export interface WorkoutDataSlice {
  completedWorkouts: WorkoutStats[];
  weeklyStats: WeeklyStats[];
  monthlyStats: MonthlyStats[];
  addWorkoutStats: (stats: Omit<WorkoutStats, 'id'>) => void;
  updateWorkoutStats: (id: string, updates: Partial<WorkoutStats>) => void;
  deleteWorkoutStats: (id: string) => void;
}

// Statistics calculations slice contract
export interface CalculationsSlice {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalDuration: number; // in minutes
  totalVolume: number;
  getCurrentStreak: () => number;
  getLongestStreak: () => number;
}

// Progress tracking slice contract
export interface ProgressSlice {
  getWeeklyStats: (startDate?: Date) => WeeklyStats[];
  getMonthlyStats: (startDate?: Date) => MonthlyStats[];
  getProgressData: (period: 'week' | 'month' | 'year') => ProgressData;
}

// General stats utilities slice contract
export interface GeneralSlice {
  resetStats: () => void;
}
