import { WaterStore, GeneralSlice, WaterTicket } from "../types";
import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import { useUserStore } from "../../user/useUserStore";

export const WATER_MIN_INTAKE = 0;
export const WATER_MAX_INTAKE = 6000;

export const WATER_MIN_INCREMENT = 50;
export const WATER_MAX_INCREMENT = 1000;

export const createGeneralSlice: StateCreator<
  WaterStore,
  [],
  [],
  GeneralSlice
> = (set, get) => ({
  waterLog: [] as WaterTicket[], // daily logs
  dailyWaterGoal: 2400, // ml
  increment: 500, // default increment

  addWater: (value: number) => {
    const { dailyWaterGoal, getWaterConsumption } = get();
    const userId = useUserStore.getState().user?.id;
    const date = new Date().toISOString();
    const waterConsumption = getWaterConsumption();
    const currentConsumption = waterConsumption + value;

    if (
      currentConsumption <= WATER_MIN_INTAKE ||
      currentConsumption > WATER_MAX_INTAKE ||
      !userId
    )
      return;

    set((state) => ({
      waterLog: [
        ...state.waterLog,
        { id: nanoid(), userId, date, value, dailyGoal: dailyWaterGoal },
      ],
    }));
  },

  removeWater: (value: number) => {
    const { waterLog, getWaterConsumption } = get();
    const waterConsumption = getWaterConsumption();
    const currentConsumption = waterConsumption - value;

    if (currentConsumption < WATER_MIN_INTAKE) return;

    const today = new Date().toISOString().split("T")[0];
    let remaining = value;

    const newLogs: WaterTicket[] = [];

    // Iterate backwards to remove from last tickets first
    for (let i = waterLog.length - 1; i >= 0; i--) {
      const log = waterLog[i];
      const logDate = log.date.split("T")[0];

      if (logDate !== today || remaining <= 0) {
        newLogs.unshift(log); // keep unchanged logs
        continue;
      }

      if (log.value <= remaining) {
        remaining -= log.value; // fully remove this log
        // do not add to newLogs
      } else {
        // partially remove
        newLogs.unshift({ ...log, value: log.value - remaining });
        remaining = 0;
      }
    }

    set({ waterLog: newLogs });
  },

  getWaterConsumption: () => {
    return get().waterLog.reduce((sum, t) => sum + t.value, 0);
  },

  setDailyWaterGoal: (goal: number) => {
    if (goal < WATER_MIN_INTAKE || goal > WATER_MAX_INTAKE) return;
    set({ dailyWaterGoal: goal });
  },

  setIncrement: (increment: number) => {
    if (increment < WATER_MIN_INCREMENT || increment > WATER_MAX_INCREMENT)
      return;
    set({ increment: Math.round(increment) });
  },

  resetTodaysWater: () => {
    const { waterLog } = get();
    const today = new Date().toISOString().split("T")[0];

    const updatedWaterLog = waterLog.filter(
      (ticket) => ticket.date.split("T")[0] !== today
    );

    set({ waterLog: updatedWaterLog });
  },

  resetWaterCompletely: () => set({ waterLog: [] }),
});
