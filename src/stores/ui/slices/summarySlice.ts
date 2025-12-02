import { StateCreator } from "zustand";
import { UIStore, SummaryViewSlice } from "../types";
import { generateWeeks } from "../../../features/calendar/useWeeks";

export const createSummarySlice: StateCreator<
  UIStore,
  [],
  [],
  SummaryViewSlice
> = (set, get) => {
  const weeks = generateWeeks();
  const today = new Date();
  const currentWeekIndex = weeks.findIndex((week) =>
    week.some((d) => d.toDateString() === today.toDateString())
  );

  return {
    isExpanded: false,
    setIsExpanded: (expanded: boolean) => set({ isExpanded: expanded }),

    weeks,
    setWeeks: (weeks: Date[][]) => set({ weeks }),

    currentWeekIndex: currentWeekIndex >= 0 ? currentWeekIndex : 0,
    setCurrentWeekIndex: (index: number) => set({ currentWeekIndex: index }),

    selectedDate: today,
    setSelectedDate: (date: Date) => {
      const weekIndex = get().weeks.findIndex((week) =>
        week.some((d) => d.toDateString() === date.toDateString())
      );
      set({ selectedDate: date, currentWeekIndex: weekIndex ?? 0 });
    },

    resetSelectedDate: () => {
      const today = new Date();
      const weeks = get().weeks;
      const weekIndex = weeks.findIndex((week) =>
        week.some((d) => d.toDateString() === today.toDateString())
      );
      set({ selectedDate: today, currentWeekIndex: weekIndex ?? 0 });
    },
  };
};
