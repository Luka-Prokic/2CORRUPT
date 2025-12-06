import { create } from "zustand";
import { WorkoutStore } from "./types";
import { createTemplateSlice } from "./slices/templateSlice";
import { createSessionSlice } from "./slices/sessionSlice";
import { createExerciseSlice } from "./slices/exerciseSlice";
import { createRestSlice } from "./slices/restSlice";
import { createStatsSlice } from "./slices/statsSlice";
import { createFlowSlice } from "./slices/flowSlice";
import { createSplitPlanSlice } from "../workoutStore";
import { createDraftSlice } from "./slices/draftSlice";

export const useWorkoutStore = create<WorkoutStore>()(
  (...a) =>
    ({
      ...createTemplateSlice(...a),
      ...createSessionSlice(...a),
      ...createExerciseSlice(...a),
      ...createRestSlice(...a),
      ...createStatsSlice(...a),
      ...createFlowSlice(...a),
      ...createSplitPlanSlice(...a),
      ...createDraftSlice(...a),
    } as WorkoutStore)
);
