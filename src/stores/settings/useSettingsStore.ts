import { create } from "zustand";
import { SettingsStore } from "./types";
import { createThemeSlice } from "./slices/themeSlice";
import { createUnitsSlice } from "./slices/unitsSlice";
import { createGoalsSlice } from "./slices/goalsSlice";
import { createWorkoutSlice } from "./slices/workoutSlice";
import { createAppSlice } from "./slices/appSlice";

export const useSettingsStore = create<SettingsStore>()(
  (...a) =>
    ({
      ...createThemeSlice(...a),
      ...createUnitsSlice(...a),
      ...createGoalsSlice(...a),
      ...createWorkoutSlice(...a),
      ...createAppSlice(...a),
    } as SettingsStore)
);
