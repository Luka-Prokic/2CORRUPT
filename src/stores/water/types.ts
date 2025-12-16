export interface GeneralSlice {
  waterConsumption: number;
  dailyWaterGoal: number;
  increment: number;
  setWaterConsumption: (waterConsumption: number) => void;
  setdailyWaterGoal: (dailyWaterGoal: number) => void;
  setIncrement: (increment: number) => void;
  resetWater: () => void;
}

export type WaterStore = GeneralSlice;
