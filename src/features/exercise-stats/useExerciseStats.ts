import { useMemo, useCallback } from "react";
import {
  SessionExercise,
  Set,
  WorkoutSession,
  useWorkoutStore,
} from "../../stores/workout";
import { subMonths, subYears, isAfter, parseISO } from "../calendar/useDate";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

type RangeOptions = {
  monthsAgo?: number;
  yearsAgo?: number;
};

function getSinceDate(options?: RangeOptions): Date {
  if (options?.yearsAgo) {
    return subYears(new Date(), options.yearsAgo);
  }
  if (options?.monthsAgo) {
    return subMonths(new Date(), options.monthsAgo);
  }
  return subMonths(new Date(), 3); // default: last 3 months
}

function filterSessionsSince(
  sessions: WorkoutSession[],
  since: Date
): WorkoutSession[] {
  return sessions.filter((session) => {
    if (!session.startTime) return false;

    const date = parseISO(session.startTime);
    if (!(date instanceof Date) || isNaN(date.getTime())) return false;

    return isAfter(date, since);
  });
}

/* -------------------------------------------------------
   Core aggregate hook
------------------------------------------------------- */

function useExerciseAggregate(
  exerciseInfoId: string,
  options: RangeOptions | undefined,
  aggregator: (acc: number, exercise: SessionExercise) => number,
  initialValue = 0
) {
  const { completedSessions } = useWorkoutStore();
  const since = getSinceDate(options);

  return useMemo(() => {
    const sessions = filterSessionsSince(completedSessions, since);
    let result = initialValue;

    sessions.forEach((session) => {
      session.layout.forEach((exercise) => {
        if (exercise.exerciseInfoId === exerciseInfoId) {
          result = aggregator(result, exercise);
        }
      });
    });

    return result;
  }, [completedSessions, exerciseInfoId, aggregator, initialValue, since]);
}

/* -------------------------------------------------------
   Stats hooks
------------------------------------------------------- */

// Times used
export function useExerciseCount(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number) => acc + 1, []);
  return useExerciseAggregate(id, options, aggregator);
}

// Total reps
export function useExerciseReps(id: string, options?: RangeOptions) {
  const aggregator = useCallback(
    (acc: number, exercise: SessionExercise) =>
      acc +
      exercise.sets.reduce((sum, set: Set) => sum + (Number(set.reps) || 0), 0),
    []
  );

  return useExerciseAggregate(id, options, aggregator);
}

// Total lifted weight (raw sum)
export function useExerciseWeight(id: string, options?: RangeOptions) {
  const aggregator = useCallback(
    (acc: number, exercise: SessionExercise) =>
      acc +
      exercise.sets.reduce(
        (sum, set: Set) => sum + (Number(set.weight) || 0),
        0
      ),
    []
  );

  return useExerciseAggregate(id, options, aggregator);
}

// PR weight (max single-set weight)
export function useExercisePRWeight(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number, exercise: SessionExercise) => {
    const maxWeight = exercise.sets.reduce(
      (max, set: Set) => Math.max(max, Number(set.weight) || 0),
      0
    );
    return Math.max(acc, maxWeight);
  }, []);

  return useExerciseAggregate(id, options, aggregator);
}

// PR reps (max single-set reps)
export function useExercisePRReps(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number, exercise: SessionExercise) => {
    if (!exercise.sets.length) return acc;

    // 1. Find PR weight for THIS exercise occurrence
    const prWeight = exercise.sets.reduce(
      (max, set: Set) => Math.max(max, Number(set.weight) || 0),
      0
    );

    if (prWeight === 0) return acc;

    // 2. Find max reps done at that PR weight
    const repsAtPRWeight = exercise.sets.reduce(
      (max, set: Set) =>
        Number(set.weight) === prWeight
          ? Math.max(max, Number(set.reps) || 0)
          : max,
      0
    );

    // 3. Compare with previous sessions
    return Math.max(acc, repsAtPRWeight);
  }, []);

  return useExerciseAggregate(id, options, aggregator);
}

export function useExerciseMaxReps(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number, exercise: SessionExercise) => {
    const maxReps = exercise.sets.reduce(
      (max, set: Set) => Math.max(max, Number(set.reps) || 0),
      0
    );
    return Math.max(acc, maxReps);
  }, []);

  return useExerciseAggregate(id, options, aggregator);
}

// Total sets
export function useExerciseTotalSets(id: string, options?: RangeOptions) {
  const aggregator = useCallback(
    (acc: number, exercise: SessionExercise) => acc + exercise.sets.length,
    []
  );

  return useExerciseAggregate(id, options, aggregator);
}

// Average weight per set (session-weighted)
export function useExerciseAverageWeight(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number, exercise: SessionExercise) => {
    if (!exercise.sets.length) return acc;

    const total = exercise.sets.reduce(
      (sum, set) => sum + (Number(set.weight) || 0),
      0
    );

    return acc + total / exercise.sets.length;
  }, []);

  return useExerciseAggregate(id, options, aggregator);
}

// Average reps per set (session-weighted)
export function useExerciseAverageReps(id: string, options?: RangeOptions) {
  const aggregator = useCallback((acc: number, exercise: SessionExercise) => {
    if (!exercise.sets.length) return acc;

    const total = exercise.sets.reduce(
      (sum, set) => sum + (Number(set.reps) || 0),
      0
    );

    return acc + total / exercise.sets.length;
  }, []);

  return useExerciseAggregate(id, options, aggregator);
}
