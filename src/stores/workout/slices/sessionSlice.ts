import { StateCreator } from "zustand";
import {
  WorkoutStore,
  WorkoutSession,
  Set,
  DropSet,
  SessionExercise,
  WorkoutTemplate,
  ExerciseColumns,
} from "../types";
import { defaultSession, EmptySet } from "../../../config/constants/defaults";
import { nanoid } from "nanoid/non-secure";

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
      id: `session-${nanoid()}`,
      templateId: template?.id || null,
      templateVersion: template?.version || null,
      name: template?.name || `Workout ${now.toLocaleDateString("en-GB")}`,
      startTime: now.toISOString(),
      isActive: true,
      layout: template
        ? template.layout.map((layoutItem: SessionExercise) => {
            return {
              ...layoutItem,
            };
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

    activeSession.layout.forEach((exercise: SessionExercise) => {
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

  /**
   * Add a new exercise to the session layout
   */
  addExerciseToSession: (exercise: SessionExercise, afterItemId?: string) => {
    const {
      activeSession,
      activeExercise,
      setActiveExercise,
      updateNavigationFlags,
    } = get();
    if (!activeSession) return;

    const newColumns: ExerciseColumns[] = exercise.equipment.includes(
      "bodyweight"
    )
      ? ["Reps"]
      : exercise.columns || ["Reps", "Weight"];

    const newExercise: SessionExercise = {
      ...exercise,
      id: exercise.id || `exercise-${nanoid()}`,
      sets: exercise.sets || [EmptySet],
      columns: newColumns,
    };

    const layout = activeSession.layout;
    const insertIndex = afterItemId
      ? layout.findIndex((item: SessionExercise) => item.id === afterItemId) + 1
      : layout.length;

    const updatedLayout = [...layout];
    updatedLayout.splice(insertIndex, 0, newExercise);

    set((state) => ({
      activeSession: { ...state.activeSession!, layout: updatedLayout },
    }));

    //if layout has no active exercise, set the new exercise as active
    if (!activeExercise) {
      setActiveExercise(newExercise.id);
    }

    //update navigation flags in flowSlice
    updateNavigationFlags();
  },

  /**
   * Remove multiple exercises from the session layout
   */
  removeExercisesFromSession: (exerciseIds: string[]) => {
    const {
      activeSession,
      activeExercise,
      updateNavigationFlags,
      setActiveExercise,
    } = get();
    if (!activeSession) return;

    const newLayout = activeSession.layout.filter(
      (item: SessionExercise) => !exerciseIds.includes(item.id)
    );

    let newActiveExerciseId = activeExercise?.id;
    if (exerciseIds.includes(activeExercise?.id ?? "")) {
      newActiveExerciseId = newLayout.length > 0 ? newLayout[0].id : null;
    }

    set({
      activeSession: { ...activeSession, layout: newLayout },
    });
    setActiveExercise(newActiveExerciseId);

    updateNavigationFlags();
  },

  /**
   * Reorder items in the session layout
   */
  reorderSessionItems: (newOrder: SessionExercise[]) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state) => ({
      activeSession: {
        ...state.activeSession!,
        layout: newOrder,
      },
    }));
  },
});
