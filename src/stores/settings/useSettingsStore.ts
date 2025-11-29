import { create } from "zustand";
import { SettingsStore } from "./types";
import { createThemeSlice } from "./slices/themeSlice";
import { createGeneralSlice } from "./slices/generalSlice";
import { createUnitsSlice } from "./slices/unitsSlice";

export const useSettingsStore = create<SettingsStore>()(
  (...a) =>
    ({
      ...createThemeSlice(...a),
      ...createGeneralSlice(...a),
      ...createUnitsSlice(...a),
    } as SettingsStore)
);
