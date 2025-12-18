import { CreatineStore, GeneralSlice } from "../types";
import { StateCreator } from "zustand";

export const createGeneralSlice: StateCreator<
  CreatineStore,
  [],
  [],
  GeneralSlice
> = (set, get) => ({
  // STATE
  creatineConsumption: 0, // in grams
  dailyCreatineGoal: 10, // in grams
  timesADay: 1, // number of times a day to take creatine to reach the daily goal
  creatineWidgetLabel: "100% monohydrate", //widget label default value

  setCreatineWidgetLabel: (creatineWidgetLabel: string) => {
    set({ creatineWidgetLabel });
  },

  // ACTIONS
  addCreatine: () => {
    const { creatineConsumption, dailyCreatineGoal, timesADay } = get();

    if (creatineConsumption >= dailyCreatineGoal) return;

    const dose = dailyCreatineGoal / timesADay;
    const next = creatineConsumption + dose;

    set({
      creatineConsumption:
        next >= dailyCreatineGoal - 0.1
          ? Number(dailyCreatineGoal.toFixed(1))
          : Number(next.toFixed(1)),
    });
  },
  resetCreatine: () => set({ creatineConsumption: 0 }),

  setDailyCreatineGoal: (dailyCreatineGoal: number) => {
    if (dailyCreatineGoal < 0 || dailyCreatineGoal > 100) return;
    set({ dailyCreatineGoal: Number(dailyCreatineGoal.toFixed(1)) });
  },

  setTimesADay: (timesADay: number) => {
    if (timesADay < 1 || timesADay > 10) return;
    set({ timesADay: Math.round(timesADay) });
  },

  // COMPLETE RESET OF THE STORE
  resetCreatineCompletely: () =>
    set({
      creatineConsumption: 0,
      dailyCreatineGoal: 10,
      timesADay: 1,
      creatineWidgetLabel: "100% monohydrate",
    }),
});
