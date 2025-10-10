import { StateCreator } from "zustand";
import { WorkoutStore, Set, DropSet, SessionExercise } from "../types";

/**
 * Stats slice: provides computed statistics for workout sessions
 */
export const createStatsSlice: StateCreator<WorkoutStore, [], [], {}> = (set, get) => ({
  getActiveSessionStats: () => {
    const { activeSession } = get();
    if (!activeSession) return null;

    let totalSets = 0;
    let totalReps = 0;
    let totalVolumeKg = 0;

    // Calculate stats from all exercises in the session
    activeSession.layout.forEach((exercise: SessionExercise) => {
      
        exercise.sets.forEach((set: Set) => {
          if (set.isCompleted) {
            totalSets++;
            totalReps += set.reps || 0;
            totalVolumeKg += (set.weight || 0) * (set.reps || 0);
            
            // Add drop sets
            set.dropSets?.forEach((dropSet: DropSet) => {
              totalSets++;
              totalReps += dropSet.reps || 0;
              totalVolumeKg += (dropSet.weight || 0) * (dropSet.reps || 0);
            });
          }
        });
    });
    
    const startTime = new Date(activeSession.startTime);
    const durationSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000);

    return {
      totalSets,
      totalReps,
      totalVolumeKg,
      durationSeconds,
    };
  },
});