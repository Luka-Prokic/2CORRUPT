import { create } from 'zustand';
import { StatsStore } from './types';
import { createWorkoutDataSlice } from './slices/workoutDataSlice';
import { createCalculationsSlice } from './slices/calculationsSlice';
import { createProgressSlice } from './slices/progressSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useStatsStore = create<StatsStore>()((...a) => ({
  ...createWorkoutDataSlice(...a),
  ...createCalculationsSlice(...a),
  ...createProgressSlice(...a),
  ...createGeneralSlice(...a),
}) as StatsStore);
