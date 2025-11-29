import { StateCreator } from "zustand";
import { DistanceUnit, LengthUnit, TemperatureUnit, VolumeUnit, SettingsStore, UnitsSlice } from "../types";
import { WeightUnit } from "../types";


export const createUnitsSlice: StateCreator<SettingsStore, [], [], UnitsSlice> = (set, get) => ({
  units: {
    weight: "kg",
    length: "cm",
    distance: "km",
    volume: "ml",
    temperature: "°C",
  },
  setUnits: (units: {
    weight: WeightUnit;
    length: LengthUnit;
    distance: DistanceUnit;
    volume: VolumeUnit;
    temperature: TemperatureUnit;
  }) => set({ units }),
});
