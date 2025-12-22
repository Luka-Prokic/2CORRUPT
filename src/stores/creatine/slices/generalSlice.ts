import { CreatineStore, CreatineTicket, GeneralSlice } from "../types";
import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import { useUserStore } from "../../user/useUserStore";

export const createGeneralSlice: StateCreator<
  CreatineStore,
  [],
  [],
  GeneralSlice
> = (set, get) => ({
  // STATE
  creatineLog: [],
  dailyCreatineGoal: 10, // in grams
  timesADay: 1, // number of times a day to take creatine to reach the daily goal
  creatineWidgetLabel: "100% monohydrate", //widget label default value

  setCreatineWidgetLabel: (creatineWidgetLabel: string) => {
    set({ creatineWidgetLabel });
  },

  // ACTIONS
  addCreatine: (dose: number) => {
    const { creatineLog, dailyCreatineGoal } = get();
    const user = useUserStore.getState().user;

    // if (dose > dailyCreatineGoal) return;

    const newCreatineIntake: CreatineTicket = {
      id: nanoid(),
      userId: user?.id ?? "",
      date: new Date().toISOString(),
      gramsGoal: dailyCreatineGoal,
      gramsTaken: Number((dose ?? 0).toFixed(0)),
    };

    set({ creatineLog: [...creatineLog, newCreatineIntake] });
  },

  resetTodaysCreatine: () => {
    const { creatineLog } = get();
    const today = new Date().toISOString();

    const updatedCreatineLog = creatineLog.filter(
      (ticket) => ticket.date == today
    );

    set({ creatineLog: updatedCreatineLog });
  },

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
      creatineLog: [],
      dailyCreatineGoal: 10,
      timesADay: 1,
      creatineWidgetLabel: "100% monohydrate",
    }),
});
