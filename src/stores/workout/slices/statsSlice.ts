import { StateCreator } from "zustand";
import { WorkoutStore, WorkoutSet, DropSet } from "../types";

/**
 * Stats slice: provides computed statistics for workout sessions
 */
export const createStatsSlice: StateCreator<WorkoutStore, [], [], any> = (set, get) => ({
  getActiveSessionStats: () => {
    const { activeSession } = get();
    if (!activeSession) return null;

    let totalSets = 0;
    let totalReps = 0;
    let totalVolumeKg = 0;

    // Calculate stats from all exercises in the session
    activeSession.items.forEach((item: any) => {
      if (item.type === "exercise") {
        item.exercise.sets.forEach((set: WorkoutSet) => {
          if (set.isCompleted) {
            totalSets++;
            totalReps += set.reps || 0;
            totalVolumeKg += ((set.weight || 0) * (set.reps || 0));
            
            // Add drop sets
            if (set.dropSets) {
              set.dropSets.forEach((dropSet: DropSet) => {
                totalSets++;
                totalReps += dropSet.reps || 0;
                totalVolumeKg += ((dropSet.weight || 0) * (dropSet.reps || 0));
              });
            }
          }
        });
      } else if (item.type === "superset" || item.type === "circuit") {
        item.exercises.forEach((exercise: any) => {
          exercise.sets.forEach((set: WorkoutSet) => {
            if (set.isCompleted) {
              totalSets++;
              totalReps += set.reps || 0;
              totalVolumeKg += ((set.weight || 0) * (set.reps || 0));
              
              // Add drop sets
              if (set.dropSets) {
                set.dropSets.forEach((dropSet: DropSet) => {
                  totalSets++;
                  totalReps += dropSet.reps || 0;
                  totalVolumeKg += ((dropSet.weight || 0) * (dropSet.reps || 0));
                });
              }
            }
          });
        });
      }
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