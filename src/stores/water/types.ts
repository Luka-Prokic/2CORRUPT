export interface GeneralSlice {
  waterConsumption: number;
  dailyWaterGoal: number;
  increment: number;
  setWaterConsumption: (waterConsumption: number) => void;
  setDailyWaterGoal: (dailyWaterGoal: number) => void;
  setIncrement: (increment: number) => void;
  resetWaterCompletely: () => void;
}

export type WaterStore = GeneralSlice;
