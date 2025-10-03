import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorkoutStore } from "./types";
import { createTemplateSlice } from "./slices/templateSlice";
import { createSessionSlice } from "./slices/sessionSlice";
import { createExerciseSlice } from "./slices/exerciseSlice";
import { createTimerSlice } from "./slices/timerSlice";
import { createStatsSlice } from "./slices/statsSlice";

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (...a) => ({
      ...createTemplateSlice(...a),
      ...createSessionSlice(...a),
      ...createExerciseSlice(...a),
      ...createTimerSlice(...a),
      ...createStatsSlice(...a),
    }) as WorkoutStore,
    {
      name: "workout-storage",
      partialize: (state) => ({
        templates: state.templates,
        activeTemplateId: state.activeTemplateId,
        completedSessions: state.completedSessions,
      }),
    }
  )
);


