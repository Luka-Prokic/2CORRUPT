import { create } from "zustand";
import { SettingsStore } from "./types";
import { createThemeSlice } from "./slices/themeSlice";
import { createUnitsSlice } from "./slices/unitsSlice";
import { createGoalsSlice } from "./slices/goalsSlice";
import { createWorkoutSlice } from "./slices/workoutSlice";
import { createGeneralSlice } from "./slices/generalSlice";

export const useSettingsStore = create<SettingsStore>()(
  (...a) =>
    ({
      ...createThemeSlice(...a),
      ...createUnitsSlice(...a),
      ...createGoalsSlice(...a),
      ...createWorkoutSlice(...a),
      ...createGeneralSlice(...a),
    } as SettingsStore)
);
