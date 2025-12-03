import { useMemo } from "react";
import { useWorkoutStore } from "../../stores/workout";

export const useFindPlannedDay = (date: Date) => {
  const { activeSplitPlan } = useWorkoutStore();

  return useMemo(() => {
    if (!activeSplitPlan) return undefined;
    const { plan, startDay, startTime } = activeSplitPlan;

    const start = new Date(startTime);
    const target = date;

    // floor days difference
    const daysPassed = Math.floor(
      (target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // negative difference means before plan start → no planned workout
    if (daysPassed < 0) return undefined;

    const { split } = plan;

    // which day of the split the user should be on
    const plannedIndex = (startDay + daysPassed) % split.length;

    const day = split[plannedIndex];

    if (!day) return undefined;

    return {
      dayIndex: plannedIndex,
      day,
      workouts: day.workouts,
    };
  }, [activeSplitPlan, date]);
};
