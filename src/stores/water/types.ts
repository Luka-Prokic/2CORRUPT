import { IsoDateString } from "../workout/types";
export interface WaterTicket {
  readonly id: string;
  readonly userId: string;
  readonly date: IsoDateString;
  value: number; //  in ml
  dailyGoal: number; // in ml
}

export interface GeneralSlice {
  waterLog: WaterTicket[];
  dailyWaterGoal: number; // in ml
  increment: number; // default increment value

  // Actions
  addWater: (value: number) => void;
  removeWater: (value: number) => void;

  getWaterConsumption: () => number;

  setDailyWaterGoal: (goal: number) => void;
  setIncrement: (increment: number) => void;

  resetTodaysWater: () => void;
  resetWaterCompletely: () => void;
}

// Full Zustand store type (for your store)
export interface WaterStore extends GeneralSlice {}
