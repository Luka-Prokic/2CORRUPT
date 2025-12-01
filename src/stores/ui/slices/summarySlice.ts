import { StateCreator } from "zustand";
import { UIStore, SummaryViewSlice } from "../types";

const generateWeeks = (): Date[][] => {
  const weeks: Date[][] = [];

  const today = new Date();

  // Find Monday of THIS week (ISO week)
  const jsDay = today.getDay(); // 0=Sun → 6, 1=Mon → 0
  const mondayIndex = (jsDay + 6) % 7;
  const mondayThisWeek = new Date(today);
  mondayThisWeek.setDate(today.getDate() - mondayIndex);

  // We want about 60 days BEFORE today → ~8–9 weeks
  const totalWeeks = Math.ceil(60 / 7);

  for (let w = totalWeeks - 1; w >= 0; w--) {
    const week: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(mondayThisWeek);
      d.setDate(mondayThisWeek.getDate() - w * 7 + i);
      week.push(d);
    }

    weeks.push(week);
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
  setSelectedDate: (date: Date) => {
    const weekIndex = get().weeks.findIndex((week) =>
      week.some((d) => d.toDateString() === date.toDateString())
    );
    set({ selectedDate: date, currentWeekIndex: weekIndex ?? 0 });
  },

  weeks: generateWeeks(),
  setWeeks: (weeks: Date[][]) => set({ weeks }),
});
