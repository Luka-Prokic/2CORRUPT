import { useMemo } from "react";
import {
  useWorkoutStore,
  WorkoutSession,
  WorkoutTemplate,
} from "../../stores/workout";

export interface MuscleScore {
  muscle: string;
  score: number;
  percentage: number; // normalized 0–100 scale
}

/**
 * Hook to calculate muscle scores for a given session.
 *
 * Each muscle receives:
 * - +3 if it’s the only primary muscle
 * - +2 if there are multiple primary muscles
 * - +1 if secondary
 * - +1 per completed set (applies to both primary and secondary)
 */
export const useMuscleScoresForSession = (
  session: WorkoutSession | null
): MuscleScore[] => {
  const { exercises } = useWorkoutStore();

  return useMemo(() => {
    if (!session?.layout || session.layout.length === 0) return [];

    const scores: Record<string, number> = {};

    session.layout.forEach((exercise) => {
      const info = exercise.exerciseInfoId
        ? exercises.find((e) => e.id === exercise.exerciseInfoId)
        : null;

      const primary = info?.primaryMuscles || exercise.primaryMuscles || [];
      const secondary =
        info?.secondaryMuscles || exercise.secondaryMuscles || [];

      // Only count completed sets
      const completedSets = (exercise.sets || []).filter(
        (s) => s.isCompleted
      ).length;

      // Rule: +3 for single-primary, +2 for multi-primary
      const primaryBonus = primary.length > 1 ? 2 : 3;

      // Add primary scores
      primary.forEach((muscle) => {
        scores[muscle] = (scores[muscle] || 0) + primaryBonus + completedSets;
      });

      // Add secondary scores
      secondary.forEach((muscle) => {
        scores[muscle] = (scores[muscle] || 0) + 1 + completedSets;
      });
    });

    const maxScore = Math.max(...Object.values(scores), 0);

    return Object.entries(scores)
      .map(([muscle, score]) => ({
        muscle,
        score,
        percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [session, exercises]);
};

/**
 * Hook that returns normalized muscle scores for a specific date.
 * Combines all sessions from that day and calculates a percentage per muscle.
 */
export const useMuscleScoresForDay = (date: Date): MuscleScore[] => {
  const { completedSessions, exercises } = useWorkoutStore();

  return useMemo(() => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sessionsForDay: WorkoutSession[] = completedSessions.filter(
      (s) =>
        new Date(s.startTime).getTime() >= startOfDay.getTime() &&
        new Date(s.startTime).getTime() <= endOfDay.getTime()
    );

    const scores: Record<string, number> = {};

    sessionsForDay.forEach((session) => {
      session.layout?.forEach((exercise) => {
        const info = exercise.exerciseInfoId
          ? exercises.find((e) => e.id === exercise.exerciseInfoId)
          : null;

        const primary = info?.primaryMuscles || exercise.primaryMuscles || [];
        const secondary =
          info?.secondaryMuscles || exercise.secondaryMuscles || [];

        const completedSets = (exercise.sets || []).filter(
          (s) => s.isCompleted
        ).length;

        const primaryBonus = primary.length > 1 ? 2 : 3;

        primary.forEach((muscle) => {
          scores[muscle] = (scores[muscle] || 0) + primaryBonus + completedSets;
        });

        secondary.forEach((muscle) => {
          scores[muscle] = (scores[muscle] || 0) + 1 + completedSets;
        });
      });
    });

    const totalScore = Object.values(scores).reduce((sum, n) => sum + n, 0);
    if (totalScore === 0) return [];

    return Object.entries(scores)
      .map(([muscle, score]) => ({
        muscle,
        score,
        percentage: Math.round((score / totalScore) * 100),
      }))
      .sort((a, b) => b.score - a.score);
  }, [completedSessions, exercises, date]);
};

export const useMuscleScoresForTemplate = (
  template: WorkoutTemplate | null
) => {
  const { exercises } = useWorkoutStore();

  return useMemo(() => {
    if (!template?.layout || template.layout.length === 0) return [];

    const scores: Record<string, number> = {};

    template.layout.forEach((exercise) => {
      const info = exercise.exerciseInfoId
        ? exercises.find((e) => e.id === exercise.exerciseInfoId)
        : null;

      const primary = info?.primaryMuscles || exercise.primaryMuscles || [];
      const secondary =
        info?.secondaryMuscles || exercise.secondaryMuscles || [];

      const setCount = (exercise.sets || []).length;

      // --- UPDATED SCORING SYSTEM ---
      const primaryBonus = primary.length === 1 ? 5 : 3;

      primary.forEach((muscle) => {
        scores[muscle] = (scores[muscle] || 0) + primaryBonus + setCount;
      });

      secondary.forEach((muscle) => {
        scores[muscle] = (scores[muscle] || 0) + 1 + setCount;
      });
    });

    const maxScore = Math.max(...Object.values(scores), 0);

    return Object.entries(scores)
      .map(([muscle, score]) => ({
        muscle,
        score,
        percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [template, exercises]);
};
