import { useCallback } from "react";

export const generateWeeks = useCallback(() => {
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
}, []);
