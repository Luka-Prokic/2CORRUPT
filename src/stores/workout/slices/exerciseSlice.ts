import { StateCreator } from "zustand";
import {
  WorkoutStore,
  SessionExercise,
  Set,
  DropSet,
  ExerciseInfo,
} from "../types";
import { exercisesDefList } from "../../../config/constants/defaults";
import { nanoid } from "nanoid/non-secure";

/**
 * Exercise slice: manages the active exercise (single source of truth during editing)
 * and syncs it back to the session layout
 */
export const createExerciseSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  activeExercise: null,
  exercises: exercisesDefList,
  /**
   * Set the active exercise by finding it in the session layout and creating a copy
   */
  setActiveExercise: (exerciseId: string) => {
    const {
      activeSession,
      syncActiveExerciseToSession,
      updateNavigationFlags,
    } = get();

    // First, sync any existing active exercise before switching
    if (get().activeExercise) {
      syncActiveExerciseToSession();
    }

    if (!activeSession) return;

    // Helper to deep-copy a SessionExercise safely
    function copyExercise(ex: SessionExercise): SessionExercise {
      return {
        ...ex,
        sets: ex.sets.map((s) => ({
          ...s,
          dropSets: s.dropSets ? s.dropSets.map((ds) => ({ ...ds })) : [],
        })),
        columns: ex.columns ? [...ex.columns] : ["Reps", "Weight"], // safe fallback
        primaryMuscles: [...ex.primaryMuscles],
        secondaryMuscles: ex.secondaryMuscles
          ? [...ex.secondaryMuscles]
          : undefined,
        equipment: ex.equipment ? [...ex.equipment] : undefined,
      };
    }

    // Find the exercise in the layout (top-level or nested)
    let foundExercise: SessionExercise | null = null;
    for (const item of activeSession.layout) {
      if (item.id === exerciseId) {
        foundExercise = item;
        break;
      }
    }

    if (foundExercise) {
      set({ activeExercise: copyExercise(foundExercise) });
    }

    // Update navigation flags for flowSlice
    updateNavigationFlags();
  },

  /**
   * Clear the active exercise (syncing first)
   */
  clearActiveExercise: () => {
    const { syncActiveExerciseToSession } = get();
    syncActiveExerciseToSession();
    set({ activeExercise: null });
  },

  /**
   * Sync the active exercise back to the session layout
   */
  syncActiveExerciseToSession: () => {
    const { activeExercise, activeSession } = get();
    if (!activeExercise || !activeSession) return;

    const layout = activeSession.layout.map((item: SessionExercise) => {
      if (item.id === activeExercise.id) {
        return {
          ...activeExercise,
          sets: activeExercise.sets.map((s) => ({
            ...s,
            dropSets: s.dropSets ? [...s.dropSets] : undefined,
          })),
        };
      }
      return item;
    });

    set((state) => ({
      activeSession: { ...state.activeSession!, layout },
    }));
  },

  /**
   * Update properties of the active exercise (and auto-sync)
   */
  updateActiveExercise: (updates: Partial<SessionExercise>) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        ...updates,
        id: activeExercise.id, // Preserve immutable id
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Add a set to the active exercise (and auto-sync)
   */
  addSetToActiveExercise: (
    reps: number | null = 0,
    weight: number | null = 0
  ) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    const newSet: Set = {
      id: `set-${nanoid()}`,
      reps,
      weight,
      isCompleted: false,
      dropSets: [],
    };

    set({
      activeExercise: {
        ...activeExercise,
        sets: [...activeExercise.sets, newSet],
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Update a specific set in the active exercise (and auto-sync)
   */
  updateSetInActiveExercise: (setId: string, updates: Partial<Set>) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.map((s) =>
          s.id === setId ? { ...s, ...updates, id: s.id } : s
        ),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Remove a set from the active exercise (and auto-sync)
   */
  removeSetFromActiveExercise: (setId: string) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.filter((s) => s.id !== setId),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Add a drop set to a specific set in the active exercise (and auto-sync)
   */
  addDropSetToActiveExercise: (
    setId: string,
    reps: number | null,
    weight: number | null
  ) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    const newDropSet: DropSet = {
      id: `drop-${nanoid()}`,
      reps,
      weight,
    };

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.map((s) =>
          s.id === setId
            ? { ...s, dropSets: [...(s.dropSets || []), newDropSet] }
            : s
        ),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Update a drop set in the active exercise (and auto-sync)
   */
  updateDropSetInActiveExercise: (
    setId: string,
    dropSetId: string,
    updates: Partial<DropSet>
  ) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.map((s) =>
          s.id === setId
            ? {
                ...s,
                dropSets: s.dropSets?.map((ds) =>
                  ds.id === dropSetId ? { ...ds, ...updates, id: ds.id } : ds
                ),
              }
            : s
        ),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Remove a drop set from the active exercise (and auto-sync)
   */
  removeDropSetFromActiveExercise: (setId: string, dropSetId: string) => {
    const { activeExercise, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.map((s) =>
          s.id === setId
            ? {
                ...s,
                dropSets: s.dropSets?.filter((ds) => ds.id !== dropSetId),
              }
            : s
        ),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },

  /**
   * Swap an exercise in the active exercise (and auto-sync)
   */
  swapExerciseInActiveExercise: (exerciseId: ExerciseInfo["id"]) => {
    const { activeExercise, exercises, syncActiveExerciseToSession } = get();
    if (!activeExercise) return;

    const exerciseInfo = exercises.find((e) => e.id === exerciseId);

    const isBodyweight = exerciseInfo?.equipment?.includes("bodyweight");

    const newSets = activeExercise.sets.map((set) => ({
      ...set,
      weight: isBodyweight ? null : set.weight,
      dropSets: isBodyweight ? [] : set.dropSets,
    }));

    set({
      activeExercise: {
        ...activeExercise,
        exerciseInfoId: exerciseInfo?.id,
        name: exerciseInfo?.defaultName,
        prefix: undefined,
        primaryMuscles: [...exerciseInfo?.primaryMuscles],
        secondaryMuscles: exerciseInfo?.secondaryMuscles
          ? [...exerciseInfo?.secondaryMuscles]
          : undefined,
        equipment: exerciseInfo?.equipment
          ? [...exerciseInfo?.equipment]
          : undefined,
        sets: newSets,
        columns: isBodyweight ? ["Reps"] : ["Reps", "Weight"],
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
  },
});
