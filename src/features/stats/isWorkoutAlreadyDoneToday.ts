import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { SplitPlanWorkout } from "../../stores/workout/types";
import { getISODateOnly } from "../../utils/getISODateOnly";

export const isWorkoutAlreadyDoneToday = (
  workout: SplitPlanWorkout,
  date: Date
) => {
  const { completedSessions } = useWorkoutStore();
  if (!workout) return false;

  const targetDateOnly = getISODateOnly(date.toISOString());

  return completedSessions.some((session) => {
    return (
      session.templateId === workout.templateId &&
      getISODateOnly(session.startTime) === targetDateOnly
    );
  });
};
