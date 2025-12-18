export interface GeneralSlice {
  creatineConsumption: number;
  dailyCreatineGoal: number; // in grams
  timesADay: number; // number of times a day to take creatine to reach the daily goal
  addCreatine: () => void;
  resetCreatine: () => void;
  setDailyCreatineGoal: (dailyCreatineGoal: number) => void;
  setTimesADay: (timesADay: number) => void;
  resetCreatineCompletely: () => void;

  // WIDGET CUSTOMIZATION
  creatineWidgetLabel: string;
  setCreatineWidgetLabel: (creatineWidgetLabel: string) => void;
}

export type CreatineStore = GeneralSlice;
