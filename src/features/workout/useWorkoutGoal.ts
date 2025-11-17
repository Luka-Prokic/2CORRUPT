import { useMemo } from "react";
import { useWorkoutStore } from "../../stores/workout";
import { NoSplit } from "../../stores/workout/slices/splitSlice";

const WEEK_LENGTH = 7;
export function useWeeklyWorkoutGoal(): number {
  const { activeSplitPlan } = useWorkoutStore();

  return useMemo(() => {
    const plan = activeSplitPlan?.plan || NoSplit;
    const startDay = activeSplitPlan?.startDay || 0;
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
    const startIndex =
      plan.id === "no-split" ? 0 : (startDay + today) % plan.splitLength;

    if (plan.id === "no-split") return plan.activeLength;

    let count = 0;

    for (let i = 0; i < WEEK_LENGTH; i++) {
      const dayIndex = (startIndex + i) % plan.splitLength;
      const day = plan.split[dayIndex];
      if (day && day.isRest) continue;
      if (day && !day.workouts?.length)
        count += 1; //count active days as 1 if there is no workouts
      else if (day && day.workouts?.length) count += day.workouts?.length; //count workouts if the day is not a rest day
    }

    return count || 1;
  }, [activeSplitPlan]);
}
