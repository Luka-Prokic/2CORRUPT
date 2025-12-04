import { useMemo } from "react";
import {
  useWorkoutStore,
  WorkoutSession,
  WorkoutTemplate,
} from "../../stores/workout";

export interface CategoryScore {
  category: string;
  score: number;
  percentage: number;
}

/**
 * Aggregate category scores for all sessions of a given day.
 * Same logic: +2 per exercise, +1 per completed set.
 */
export const useCategoryScoresForDay = (date: Date) => {
  const { completedSessions, exercises } = useWorkoutStore();

  return useMemo(() => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sessionsForDay = completedSessions.filter(
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

        const category = info?.category || "full-body";
        const completedSets = (exercise.sets || []).filter(
          (s) => s.isCompleted
        ).length;

        scores[category] = (scores[category] || 0) + 2 + completedSets;
      });
    });

    const totalScore = Object.values(scores).reduce((sum, n) => sum + n, 0);
    if (totalScore === 0) return [];

    return Object.entries(scores)
      .map(([category, score]) => ({
        category,
        score,
        percentage: Math.round((score / totalScore) * 100),
      }))
      .sort((a, b) => b.score - a.score);
  }, [completedSessions, exercises, date]);
};

/**
 * Each exercise:
 * - contributes +2 to its category
 * - each completed set contributes +1
 */
export const useCategoryScoresForSession = (
  session: WorkoutSession | null
): { category: string; score: number; percentage: number }[] => {
  const { exercises } = useWorkoutStore();

  return useMemo(() => {
    if (!session?.layout || session.layout.length === 0) return [];

    const scores: Record<string, number> = {};

    session.layout.forEach((exercise) => {
      const info = exercise.exerciseInfoId
        ? exercises.find((e) => e.id === exercise.exerciseInfoId)
        : null;

      const category = info?.category || "full-body";
      const completedSets = (exercise.sets || []).filter(
        (s) => s.isCompleted
      ).length;

      // +2 for exercise, +1 per completed set
      scores[category] = (scores[category] || 0) + 2 + completedSets;
    });

    const maxScore = Math.max(...Object.values(scores), 0);

    return Object.entries(scores)
      .map(([category, score]) => ({
        category,
        score,
        percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [session, exercises]);
};

export const useCategoryScoresForTemplate = (
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

      const category = info?.category || "full-body";
      const setCount = (exercise.sets || []).length; // template → all sets count

      // +2 per exercise +1 per set
      scores[category] = (scores[category] || 0) + 2 + setCount;
    });

    const maxScore = Math.max(...Object.values(scores), 0);

    return Object.entries(scores)
      .map(([category, score]) => ({
        category,
        score,
        percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [template, exercises]);
};
