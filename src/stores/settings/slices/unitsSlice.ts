import { StateCreator } from "zustand";
import { SettingsStore, UnitsSlice } from "../types";
import { WeightUnit } from "../types";


export const createUnitsSlice: StateCreator<SettingsStore, [], [], UnitsSlice> = (set, get) => ({
  units: {
    weight: "kg",
  },
  setUnits: (units: { weight: WeightUnit }) => set({ units }),
});
