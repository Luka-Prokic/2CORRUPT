import { useMemo } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export type WeekRangeMode = "short" | "mid" | "long";

/* ------------------------------------------------------------------ */
/* Pure utilities (NO hooks here) */
/* ------------------------------------------------------------------ */

/**
 * Generate past weeks (ISO, Monday → Sunday)
 * Safe to use in stores, slices, helpers, anywhere.
 */
export function generateWeeks(daysBack = 60): Date[][] {
  const weeks: Date[][] = [];
  const today = new Date();

  const jsDay = today.getDay(); // 0=Sun ... 6=Sat
  const mondayIndex = (jsDay + 6) % 7;

  const mondayThisWeek = new Date(today);
  mondayThisWeek.setHours(0, 0, 0, 0);
  mondayThisWeek.setDate(today.getDate() - mondayIndex);

  const totalWeeks = Math.ceil(daysBack / 7);

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
}

/**
 * Get start/end timestamps for a week
 */
export function getWeekBounds(week: Date[] | undefined): {
  start?: Date;
  end?: Date;
} {
  if (!week || week.length !== 7) {
    return { start: undefined, end: undefined };
  }

  const start = new Date(week[0]);
  start.setHours(0, 0, 0, 0);

  const end = new Date(week[6]);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/**
 * Human-readable week label
 */
export function getWeekRange(
  week: Date[] | undefined,
  mode: WeekRangeMode = "short"
): string {
  if (!week || week.length !== 7) return "";

  const start = week[0];
  const end = week[6];

  const startDay = start.getDate();
  const endDay = end.getDate();

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  switch (mode) {
    case "short":
      // 04–12
      return `${startDay}-${endDay}`;

    case "mid":
      // Apr 04–12  |  Apr 28 – May 04
      if (startMonth === endMonth) {
        return `${startDay}-${endDay} ${startMonth}`;
      }
      return `${startDay} ${startMonth}-${endDay} ${endMonth}`;

    case "long":
      // Apr 04–12, 2025 | Dec 28, 2024 – Jan 03, 2025
      if (startMonth === endMonth && startYear === endYear) {
        return `${startDay}-${endDay} ${startMonth} , ${startYear}`;
      }
      if (startYear === endYear) {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} , ${startYear}`;
      }
      return `${startDay} ${startMonth} , ${startYear} - ${endDay} ${endMonth} , ${endYear}`;
  }
}

/* ------------------------------------------------------------------ */
/* Hooks */
/* ------------------------------------------------------------------ */

/**
 * Current ISO week (Monday → Sunday)
 */
export function useCurrentWeek(): Date[] {
  return useMemo(() => {
    const today = new Date();
    const jsDay = today.getDay();
    const mondayIndex = (jsDay + 6) % 7;

    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - mondayIndex);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, []);
}
