import { StateCreator } from "zustand";
import {
  WorkoutStore,
  WorkoutSession,
  Set,
  DropSet,
  SessionExercise,
  SessionLayoutItem,
  WorkoutTemplate,
} from "../types";
import { defaultSession } from "../../../config/constants/defaults";

/**
 * Session slice: manages active workout sessions
 */
export const createSessionSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  activeSession: defaultSession,
  isWorkoutActive: false,
  completedSessions: [],

  startSession: (template?: WorkoutTemplate) => {
    const now = new Date();
    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      templateId: template?.id || null,
      templateVersion: template?.version || null,
      name: template?.name || `Workout ${now.toLocaleDateString("en-GB")}`,
      startTime: now.toISOString(),
      isActive: true,
      layout: template
        ? template.layout.map((layoutItem: SessionLayoutItem) => {
            if (layoutItem.type === "exercise") {
              return {
                type: "exercise",
                id: layoutItem.id,
                exercise: {
                  id: layoutItem.id,
                  exerciseInfoId: layoutItem.exercise.exerciseInfoId,
                  name: layoutItem.exercise.name || "Unknown Exercise",
                  primaryMuscles: layoutItem.exercise.primaryMuscles || [],
                  secondaryMuscles: layoutItem.exercise.secondaryMuscles || [],
                  equipment: layoutItem.exercise.equipment || [],
                  sets: layoutItem.exercise.sets || [],
                },
              };
            } else if (layoutItem.type === "superset") {
              return {
                type: "superset",
                id: layoutItem.id,
                name: layoutItem.name,
                exercises: layoutItem.exercises.map(
                  (exercise: SessionExercise) => ({
                    id: exercise.id,
                    exerciseInfoId: exercise.exerciseInfoId,
                    name: exercise.name || "Unknown Exercise",
                    primaryMuscles: exercise.primaryMuscles || [],
                    secondaryMuscles: exercise.secondaryMuscles || [],
                    equipment: exercise.equipment || [],
                    sets: exercise.sets || [],
                  })
                ),
              };
            } else {
              // circuit
              return {
                type: "circuit",
                id: layoutItem.id,
                exercises: layoutItem.exercises.map(
                  (exercise: SessionExercise) => ({
                    id: exercise.id,
                    exerciseInfoId: exercise.exerciseInfoId,
                    name: exercise.name || "Unknown Exercise",
                    primaryMuscles: exercise.primaryMuscles || [],
                    secondaryMuscles: exercise.secondaryMuscles || [],
                    equipment: exercise.equipment || [],
                    sets: exercise.sets || [],
                  })
                ),
                rounds: layoutItem.rounds || 1,
              };
            }
          })
        : [],
      createdAt: now.toISOString(),
    };

    set({
      activeSession: newSession,
      isWorkoutActive: true,
    });
  },

  completeSession: () => {
    const { activeSession, clearActiveExercise } = get();
    if (!activeSession) return;

    // Clear active exercise first (will auto-sync)
    clearActiveExercise();

    const endTime = new Date().toISOString();
    const startTime = new Date(activeSession.startTime);
    const durationSeconds = Math.floor(
      (new Date(endTime).getTime() - startTime.getTime()) / 1000
    );

    let totalSets = 0;
    let totalReps = 0;
    let totalVolumeKg = 0;

    activeSession.layout.forEach((item: SessionLayoutItem) => {
      const exercises =
        item.type === "exercise" ? [item.exercise] : item.exercises;

      exercises.forEach((exercise: SessionExercise) => {
        exercise.sets.forEach((set: Set) => {
          if (set.isCompleted) {
            totalSets++;
            totalReps += set.reps || 0;
            totalVolumeKg += (set.weight || 0) * (set.reps || 0);

            set.dropSets?.forEach((dropSet: DropSet) => {
              totalSets++;
              totalReps += dropSet.reps || 0;
              totalVolumeKg += (dropSet.weight || 0) * (dropSet.reps || 0);
            });
          }
        });
      });
    });

    const completedSession: WorkoutSession = {
      ...activeSession,
      endTime,
      isActive: false,
      totals: { totalSets, totalReps, totalVolumeKg, durationSeconds },
      updatedAt: endTime,
    };

    set((state) => ({
      activeSession: defaultSession,
      isWorkoutActive: false,
      completedSessions: [...state.completedSessions, completedSession],
    }));
  },

  cancelSession: () => {
    const { clearActiveExercise } = get();
    clearActiveExercise();
    set({ activeSession: defaultSession, isWorkoutActive: false });
  },
});
