import { create } from "zustand";
import { SettingsStore } from "./types";
import { createThemeSlice } from "./slices/themeSlice";
import { createGeneralSlice } from "./slices/generalSlice";
import { createUnitsSlice } from "./slices/unitsSlice";
import { createGoalsSlice } from "./slices/goalsSlice";
import { createWorkoutSlice } from "./slices/workoutSlice";

export const useSettingsStore = create<SettingsStore>()(
  (...a) =>
    ({
      ...createThemeSlice(...a),
      ...createGeneralSlice(...a),
      ...createUnitsSlice(...a),
      ...createGoalsSlice(...a),
      ...createWorkoutSlice(...a),
    } as SettingsStore)
);
