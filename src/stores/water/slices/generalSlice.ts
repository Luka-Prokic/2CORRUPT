import { WaterStore, GeneralSlice } from "../types";
import { StateCreator } from "zustand";

export const createGeneralSlice: StateCreator<
  WaterStore,
  [],
  [],
  GeneralSlice
> = (set, get) => ({
  waterConsumption: 0,
  dailyWaterGoal: 2400, // ml
  increment: 500, // ml
  setWaterConsumption: (waterConsumption: number) => {
    if (waterConsumption < 0 || waterConsumption > 6000) return;
    set({ waterConsumption: Math.round(waterConsumption) });
  },
  setdailyWaterGoal: (dailyWaterGoal: number) => {
    if (dailyWaterGoal < 0 || dailyWaterGoal > 6000) return;
    set({ dailyWaterGoal });
  },
  setIncrement: (increment: number) => {
    if (increment < 50 || increment > 1000) return;
    set({ increment: Math.round(increment) });
  },
  resetWaterCompletely: () =>
    set({ waterConsumption: 0, dailyWaterGoal: 0, increment: 0 }),
});
