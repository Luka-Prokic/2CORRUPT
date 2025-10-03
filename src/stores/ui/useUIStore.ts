import { create } from 'zustand';
import { UIStore } from './types';
import { createWorkoutViewSlice } from './slices/workoutViewSlice';
import { createModalSlice } from './slices/modalSlice';
import { createWidgetSlice } from './slices/widgetSlice';
import { createNavigationSlice } from './slices/navigationSlice';
import { createLoadingSlice } from './slices/loadingSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useUIStore = create<UIStore>((...a) => ({
  ...createWorkoutViewSlice(...a),
  ...createModalSlice(...a),
  ...createWidgetSlice(...a),
  ...createNavigationSlice(...a),
  ...createLoadingSlice(...a),
  ...createGeneralSlice(...a),
}) as UIStore);
