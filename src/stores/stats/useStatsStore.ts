import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StatsStore } from './types';
import { createWorkoutDataSlice } from './slices/workoutDataSlice';
import { createCalculationsSlice } from './slices/calculationsSlice';
import { createProgressSlice } from './slices/progressSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useStatsStore = create<StatsStore>()(
  persist(
    (...a) => ({
      ...createWorkoutDataSlice(...a),
      ...createCalculationsSlice(...a),
      ...createProgressSlice(...a),
      ...createGeneralSlice(...a),
    }) as StatsStore,
    {
      name: 'stats-storage',
    }
  )
);
