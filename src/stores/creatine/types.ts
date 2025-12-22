import { IsoDateString } from "../workout/types";

export interface DailyCreatineIntake {
  readonly id: string;
  readonly userId: string;
  readonly date: IsoDateString;
  gramsGoal: number; // in grams
  gramsTaken: number; // in grams
}

export interface GeneralSlice {
  creatineLog: DailyCreatineIntake[];

  dailyCreatineGoal: number; // in grams
  timesADay: number; // number of times a day to take creatine to reach the daily goal

  addCreatine: (dose: number) => void; // in grams
  resetTodaysCreatine: () => void;

  setDailyCreatineGoal: (dailyCreatineGoal: number) => void;
  setTimesADay: (timesADay: number) => void;

  resetCreatineCompletely: () => void;

  // WIDGET CUSTOMIZATION
  creatineWidgetLabel: string;
  setCreatineWidgetLabel: (creatineWidgetLabel: string) => void;
}

export type CreatineStore = GeneralSlice;
