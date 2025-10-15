import { create } from "zustand";
import { WorkoutStore } from "./types";
import { createTemplateSlice } from "./slices/templateSlice";
import { createSessionSlice } from "./slices/sessionSlice";
import { createExerciseSlice } from "./slices/exerciseSlice";
import { createTimerSlice } from "./slices/timerSlice";
import { createStatsSlice } from "./slices/statsSlice";
import { createFlowSlice } from "./slices/flowSlice";

export const useWorkoutStore = create<WorkoutStore>()(
  (...a) =>
    ({
      ...createTemplateSlice(...a),
      ...createSessionSlice(...a),
      ...createExerciseSlice(...a),
      ...createTimerSlice(...a),
      ...createStatsSlice(...a),
      ...createFlowSlice(...a),
    } as WorkoutStore)
);
