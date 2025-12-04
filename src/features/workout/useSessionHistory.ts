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
