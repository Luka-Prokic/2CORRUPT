import { useMemo } from "react";
import { useWorkoutStore } from "../../stores/workout";
import { useFindPlannedDay } from "./useFindPlannedDay";
import { getISODateOnly } from "../../utils/getISODateOnly";

export function useFindPlannedWorkout(date: Date) {
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
}

export function useFindPlannedWorkouts(date: Date) {
  const plannedDay = useFindPlannedDay(date);

  return useMemo(() => {
    if (!plannedDay) return null;

    const { workouts } = plannedDay;
    if (!workouts || workouts.length === 0) return null;

    return workouts; // return full list, nothing filtered
  }, [plannedDay]);
}

export function useFindPlannedWorkoutNow() {
  const now = new Date();
  const plannedDay = useFindPlannedDay(now);
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    if (!plannedDay) return null;

    const workouts = plannedDay.workouts;
    if (!workouts || workouts.length === 0) return null;

    const todayISO = getISODateOnly(now.toISOString());

    // find sessions finished today
    const todaysSessions = completedSessions.filter(
      (s) => getISODateOnly(s.startTime) === todayISO
    );

    const isDoneToday = (w: { templateId: string }) =>
      todaysSessions.some((s) => s.templateId === w.templateId);

    // ---- 1) Split into timed and untimed workouts ----
    const timed = workouts.filter((w) => w.scheduledAt);
    const untimed = workouts.filter((w) => !w.scheduledAt);

    // ---- 2) If no timed workouts → fallback logic ----
    if (timed.length === 0) {
      // return first not-done workout
      const firstNotDone = workouts.find((w) => !isDoneToday(w));
      return firstNotDone ?? null;
    }

    // ---- 3) Convert timed workouts to minutes-from-midnight for comparison ----
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const timedWithDelta = timed.map((w) => {
      const d = new Date(w.scheduledAt!);
      const mins = d.getHours() * 60 + d.getMinutes();
      return {
        workout: w,
        diff: Math.abs(mins - nowMinutes),
      };
    });

    // sort by closeness to now
    timedWithDelta.sort((a, b) => a.diff - b.diff);

    // ---- 4) pick the closest timed workout NOT done today ----
    const closestValid = timedWithDelta.find(
      (item) => !isDoneToday(item.workout)
    );
    if (closestValid) return closestValid.workout;

    // ---- 5) if closest ones are all done → fallback: first untimed not-done ----
    const firstUntimedNotDone = untimed.find((w) => !isDoneToday(w));
    if (firstUntimedNotDone) return firstUntimedNotDone;

    // ---- 6) fallback: ANY first not-done workout ----
    const firstNotDone = workouts.find((w) => !isDoneToday(w));
    return firstNotDone ?? null;
  }, [plannedDay, completedSessions]);
}

export function useFindPlannedWorkoutIndexNow() {
  const plannedDay = useFindPlannedDay(new Date());
  const workoutNow = useFindPlannedWorkoutNow();

  return useMemo(() => {
    if (!plannedDay || !workoutNow) return -1;

    const workouts = plannedDay.workouts;
    if (!workouts || workouts.length === 0) return -1;

    // find index by templateId (your unique logic)
    const index = workouts.findIndex(
      (w) => w.templateId === workoutNow.templateId
    );

    return index === -1 ? -1 : index;
  }, [plannedDay, workoutNow]);
}
