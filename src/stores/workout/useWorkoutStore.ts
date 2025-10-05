import { create } from "zustand";
import { WorkoutStore } from "./types";
import { createTemplateSlice } from "./slices/templateSlice";
import { createSessionSlice } from "./slices/sessionSlice";
import { createExerciseSlice } from "./slices/exerciseSlice";
import { createTimerSlice } from "./slices/timerSlice";
import { createStatsSlice } from "./slices/statsSlice";

export const useWorkoutStore = create<WorkoutStore>()((...a) => ({
  ...createTemplateSlice(...a),
  ...createSessionSlice(...a),
  ...createExerciseSlice(...a),
  ...createTimerSlice(...a),
  ...createStatsSlice(...a),
}) as WorkoutStore);


