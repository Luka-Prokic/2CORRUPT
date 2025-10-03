import { StateCreator } from "zustand";
import { WorkoutStore } from "../types";

/**
 * Timer slice: manages rest timers
 */
export const createTimerSlice: StateCreator<WorkoutStore, [], [], any> = (set, get) => ({
  restTimer: 0,
  isTimerRunning: false,
  timerInterval: undefined,

  startTimer: (duration: number) => {
    set({ restTimer: duration, isTimerRunning: true });
    const interval = setInterval(() => {
      const { restTimer, isTimerRunning } = get();
      if (isTimerRunning && restTimer > 0) {
        set({ restTimer: restTimer - 1 });
      } else if (restTimer === 0) {
        set({ isTimerRunning: false });
        clearInterval(interval as any);
      }
    }, 1000);
    set({ timerInterval: interval as any });
  },

  stopTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval as any);
    set({ isTimerRunning: false, timerInterval: undefined });
  },

  resetTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval as any);
    set({ restTimer: 0, isTimerRunning: false, timerInterval: undefined });
  },
});


