import { StateCreator } from "zustand";
import { UIStore, SummaryViewSlice } from "../types";

const generateWeeks = (): Date[][] => {
  const weeks: Date[][] = [];

  const today = new Date();
  const start = new Date(today);

  // Move to Monday (ISO start of week)
  const jsDay = start.getDay(); // 0 = Sun, 1 = Mon...
  const mondayIndex = (jsDay + 6) % 7; // convert to Mon=0
  start.setDate(start.getDate() - mondayIndex);

  // generate at least 60 days worth of calendar
  let daysGenerated = 0;

  while (daysGenerated < 60) {
    const week: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + daysGenerated + i);
      week.push(d);
    }

    weeks.push(week);
    daysGenerated += 7;
  }

  return weeks;
};

export const createSummarySlice: StateCreator<
  UIStore,
  [],
  [],
  SummaryViewSlice
> = (set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded: boolean) => set({ isExpanded: expanded }),

  currentWeekIndex: 0,
  setCurrentWeekIndex: (index: number) => set({ currentWeekIndex: index }),

  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),

  weeks: generateWeeks(),
  setWeeks: (weeks: Date[][]) => set({ weeks }),
});
