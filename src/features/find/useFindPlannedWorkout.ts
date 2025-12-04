import { useMemo } from "react";
import { useWorkoutStore } from "../../stores/workout";
import { useFindPlannedDay } from "./useFindPlannedDay";
import { getISODateOnly } from "../../utils/getISODateOnly";

export const useFindPlannedWorkout = (date: Date) => {
  const plannedDay = useFindPlannedDay(date);
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    if (!plannedDay) return null;

    const { workouts } = plannedDay;
    if (!workouts || workouts.length === 0) return null;

    const targetDateOnly = getISODateOnly(date.toISOString());

    // Find all sessions completed today
    const todaysSessions = completedSessions.filter((s) => {
      return getISODateOnly(s.startTime) === targetDateOnly;
    });

    // Find first workout not done today
    for (const workout of workouts) {
      const isDone = todaysSessions.some(
        (session) => session.templateId === workout.templateId
      );

      if (!isDone) return workout; // ← this is the workout you should do
    }

    // If we reach here: all are done today
    return null;
  }, [plannedDay, completedSessions, date]);
};

export const useFindPlannedWorkouts = (date: Date) => {
  const plannedDay = useFindPlannedDay(date);

  return useMemo(() => {
    if (!plannedDay) return null;

    const { workouts } = plannedDay;
    if (!workouts || workouts.length === 0) return null;

    return workouts; // return full list, nothing filtered
  }, [plannedDay]);
};
