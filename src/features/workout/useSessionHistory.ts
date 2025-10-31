import { useMemo } from "react";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { WorkoutSession } from "../../stores/workout/types";

/**
 * Hook to get the most recent completed session
 * @returns The latest session from completedSessions or null if none
 */
export const useLatestSession = (): WorkoutSession | null => {
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    if (completedSessions.length === 0) return null;

    // Sort by startTime descending and return the most recent
    return [...completedSessions].sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )[0];
  }, [completedSessions]);
};

/**
 * Hook to get all sessions from a specific calendar date
 * @param date - The date to filter sessions by (time is ignored)
 * @returns Array of sessions that occurred on the specified date
 */
export const useSessionsByDate = (date: Date): WorkoutSession[] => {
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    const normalize = (d: Date) => {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);
      return copy.getTime();
    };

    const target = normalize(date);

    return completedSessions.filter((session) => {
      const sessionDate = new Date(session.startTime);
      return normalize(sessionDate) === target;
    });
  }, [completedSessions, date]);
};

/**
 * Hook to get sessions grouped by day
 * @returns Record where key is date string (YYYY-MM-DD) and value is array of sessions
 */
export const useSessionsGroupedByDay = (): Record<string, WorkoutSession[]> => {
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    const grouped: Record<string, WorkoutSession[]> = {};

    completedSessions.forEach((session) => {
      const sessionDate = new Date(session.startTime);
      const dateString = sessionDate.toISOString().split("T")[0]; // YYYY-MM-DD format

      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      grouped[dateString].push(session);
    });

    // Sort sessions within each day by startTime
    Object.keys(grouped).forEach((dateString) => {
      grouped[dateString].sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
    });

    return grouped;
  }, [completedSessions]);
};

/**
 * Utility hook to check if two sessions are from the same day
 * @param sessionA - First session to compare
 * @param sessionB - Second session to compare
 * @returns True if both sessions are from the same calendar date
 */
export const useIsSameDay = (
  sessionA: WorkoutSession,
  sessionB: WorkoutSession
): boolean => {
  return useMemo(() => {
    const dateA = new Date(sessionA.startTime);
    const dateB = new Date(sessionB.startTime);

    return (
      dateA.toISOString().split("T")[0] === dateB.toISOString().split("T")[0]
    );
  }, [sessionA.startTime, sessionB.startTime]);
};

/**
 * Hook to get sessions from a date range
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Array of sessions within the specified date range
 */
export const useSessionsByDateRange = (
  startDate: Date,
  endDate: Date
): WorkoutSession[] => {
  const { completedSessions } = useWorkoutStore();

  return useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Set time to start/end of day for accurate comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return completedSessions
      .filter((session) => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= start && sessionDate <= end;
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }, [completedSessions, startDate, endDate]);
};

/**
 * Hook to get session statistics
 * @returns Object containing various session statistics
 */
export const useSessionStats = () => {
  const { completedSessions } = useMemo(() => useWorkoutStore(), []);

  return useMemo(() => {
    const totalSessions = completedSessions.length;

    if (totalSessions === 0) {
      return {
        totalSessions: 0,
        totalVolume: 0,
        averageVolume: 0,
        totalDuration: 0,
        averageDuration: 0,
        mostRecentSession: null,
        sessionsThisWeek: 0,
        sessionsThisMonth: 0,
      };
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalVolume = completedSessions.reduce(
      (sum, session) => sum + (session.totals?.totalVolumeKg || 0),
      0
    );

    const totalDuration = completedSessions.reduce(
      (sum, session) => sum + (session.totals?.durationSeconds || 0),
      0
    );

    const sessionsThisWeek = completedSessions.filter(
      (session) => new Date(session.startTime) >= weekAgo
    ).length;

    const sessionsThisMonth = completedSessions.filter(
      (session) => new Date(session.startTime) >= monthAgo
    ).length;

    const mostRecentSession = [...completedSessions].sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )[0];

    return {
      totalSessions,
      totalVolume,
      averageVolume: totalVolume / totalSessions,
      totalDuration,
      averageDuration: totalDuration / totalSessions,
      mostRecentSession,
      sessionsThisWeek,
      sessionsThisMonth,
    };
  }, [completedSessions]);
};

export interface CategoryScore {
  category: string;
  score: number;
  percentage: number;
}
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
 * Hook to get completion ratio of a session.
 * Returns a number between 0 and 1, representing the fraction of completed sets.
 * - 0 means no sets completed
 * - 1 means all sets completed
 */
export const useSessionCompletionRatio = (session: WorkoutSession): number => {
  return useMemo(() => {
    if (!session?.layout || session.layout.length === 0) return 0;

    let totalSets = 0;
    let completedSets = 0;

    for (const exercise of session.layout) {
      if (!exercise.sets || exercise.sets.length === 0) continue;

      for (const set of exercise.sets) {
        totalSets++;
        if (set.isCompleted) completedSets++;
      }
    }

    if (totalSets === 0) return 0;
    return completedSets / totalSets;
  }, [session]);
};

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
