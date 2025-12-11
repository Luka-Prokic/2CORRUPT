import { StateCreator } from "zustand";
import {
  WorkoutStore,
  SessionExercise,
  Set,
  DropSet,
  ExerciseInfo,
  ExerciseColumns,
} from "../types";
import { nanoid } from "nanoid/non-secure";
import { exercisesDefList } from "../../../config/constants/exercises";

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
      activeTemplate,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
      updateNavigationFlags,
    } = get();

    // First, sync any existing active exercise before switching
    if (get().activeExercise) {
      if (activeSession) syncActiveExerciseToSession();
      else if (activeTemplate) syncActiveExerciseToTemplate?.();
    }

    let foundExercise: SessionExercise | null = null;

    if (activeSession) {
      for (const item of activeSession.layout) {
        if (item.id === exerciseId) {
          foundExercise = item;
          break;
        }
      }
    } else if (activeTemplate) {
      for (const item of activeTemplate.layout) {
        if (item.id === exerciseId) {
          foundExercise = item;
          break;
        }
      }
    }

    if (foundExercise) {
      // Deep copy
      const copyExercise = (ex: SessionExercise): SessionExercise => ({
        ...ex,
        sets: ex.sets.map((s) => ({
          ...s,
          dropSets: s.dropSets ? s.dropSets.map((ds) => ({ ...ds })) : [],
        })),
        columns: ex.columns ? [...ex.columns] : ["Reps", "Weight"],
        primaryMuscles: [...ex.primaryMuscles],
        secondaryMuscles: ex.secondaryMuscles
          ? [...ex.secondaryMuscles]
          : undefined,
        equipment: ex.equipment ? [...ex.equipment] : undefined,
      });

      set({ activeExercise: copyExercise(foundExercise) });
    }

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
            dropSets: s.dropSets ? s.dropSets.map((ds) => ({ ...ds })) : [],
          })),
        };
      }
      return item;
    });

    set({
      activeSession: { ...activeSession, layout },
    });
  },

  syncActiveExerciseToTemplate: () => {
    const { activeExercise, activeTemplate, templates } = get();
    if (!activeExercise || !activeTemplate) return;

    const updatedLayout = activeTemplate.layout.map((item) =>
      item.id === activeExercise.id ? { ...activeExercise } : item
    );

    // Update template in store
    const updatedTemplates = templates.map((t) =>
      t.id === activeTemplate.id ? { ...t, layout: updatedLayout } : t
    );

    set({
      templates: updatedTemplates,
      activeTemplate: { ...activeTemplate, layout: updatedLayout },
    });
  },

  /**
   * Update properties of the active exercise (and auto-sync)
   */
  updateActiveExercise: (updates: Partial<SessionExercise>) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
    if (!activeExercise) return;

    // Merge updates
    const updatedExercise = {
      ...activeExercise,
      ...updates,
      id: activeExercise.id, // Preserve immutable id
    };

    // If the exercise has sets, clean up values for disabled columns
    if (updatedExercise.sets && Array.isArray(updatedExercise.sets)) {
      const activeCols = updatedExercise.columns || [];

      updatedExercise.sets = updatedExercise.sets.map((set) => {
        const newSet = { ...set };

        // Remove data if column is not enabled
        if (!activeCols.includes("Weight")) delete newSet.weight;
        if (!activeCols.includes("Reps")) delete newSet.reps;
        if (!activeCols.includes("RPE")) delete newSet.rpe;
        if (!activeCols.includes("RIR")) delete newSet.rir;

        return newSet;
      });
    }

    // Apply updated exercise
    set({ activeExercise: updatedExercise });

    // Auto-sync after update
    syncActiveExerciseToSession();
    syncActiveExerciseToTemplate();
  },

  /**
   * Add a set to the active exercise (and auto-sync)
   */
  addSetToActiveExercise: (
    reps: number | null = 0,
    weight: number | null = 0
  ) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
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
    syncActiveExerciseToTemplate();
  },

  /**
   * Update a specific set in the active exercise (and auto-sync)
   */
  updateSetInActiveExercise: (setId: string, updates: Partial<Set>) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
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
    syncActiveExerciseToTemplate();
  },

  /**
   * Remove a set from the active exercise (and auto-sync)
   */
  removeSetFromActiveExercise: (setId: string) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
    if (!activeExercise) return;

    set({
      activeExercise: {
        ...activeExercise,
        sets: activeExercise.sets.filter((s) => s.id !== setId),
      },
    });

    // Auto-sync after update
    syncActiveExerciseToSession();
    syncActiveExerciseToTemplate();
  },

  /**
   * Add a drop set to a specific set in the active exercise (and auto-sync)
   */
  addDropSetToActiveExercise: (
    setId: string,
    reps: number | null,
    weight: number | null
  ) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
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
    syncActiveExerciseToTemplate();
  },

  /**
   * Update a drop set in the active exercise (and auto-sync)
   */
  updateDropSetInActiveExercise: (
    setId: string,
    dropSetId: string,
    updates: Partial<DropSet>
  ) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
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
    syncActiveExerciseToTemplate();
  },

  /**
   * Remove a drop set from the active exercise (and auto-sync)
   */
  removeDropSetFromActiveExercise: (setId: string, dropSetId: string) => {
    const {
      activeExercise,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
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
    syncActiveExerciseToTemplate();
  },

  /**
   * Swap an exercise in the active exercise (and auto-sync)
   */
  swapExerciseInActiveExercise: (exerciseId: ExerciseInfo["id"]) => {
    const {
      activeExercise,
      exercises,
      syncActiveExerciseToSession,
      syncActiveExerciseToTemplate,
    } = get();
    if (!activeExercise) return;

    const exerciseInfo = exercises.find((e) => e.id === exerciseId);
    if (!exerciseInfo) return;

    const isBodyweight = exerciseInfo.equipment?.includes("bodyweight");

    // Define the new columns for this exercise type
    const newColumns: ExerciseColumns[] = isBodyweight
      ? ["Reps"]
      : ["Reps", "Weight"];

    // Start by mapping sets with conditional cleanup
    const newSets = activeExercise.sets.map((set) => {
      const newSet = {
        ...set,
        weight: isBodyweight ? null : set.weight,
        dropSets: isBodyweight ? [] : set.dropSets,
      };

      // Clean up irrelevant columns dynamically
      if (!newColumns.includes("Weight")) delete newSet.weight;
      if (!newColumns.includes("Reps")) delete newSet.reps;
      if (!newColumns.includes("RPE")) delete newSet.rpe;
      if (!newColumns.includes("RIR")) delete newSet.rir;

      return newSet;
    });

    // Update the active exercise
    set({
      activeExercise: {
        ...activeExercise,
        exerciseInfoId: exerciseInfo.id,
        name: exerciseInfo.defaultName,
        prefix: undefined,
        primaryMuscles: [...exerciseInfo.primaryMuscles],
        secondaryMuscles: exerciseInfo.secondaryMuscles
          ? [...exerciseInfo.secondaryMuscles]
          : undefined,
        equipment: exerciseInfo.equipment
          ? [...exerciseInfo.equipment]
          : undefined,
        sets: newSets,
        columns: newColumns,
      },
    });

    // Sync after swap
    syncActiveExerciseToSession();
    syncActiveExerciseToTemplate();
  },

  getExerciseById: (exerciseId: string) => {
    const { exercises } = get();
    return exercises.find((e) => e.id === exerciseId) || null;
  },

  /**
   * Update the metadata of an exercise
   */
  updateExerciseMetadata: (
    exerciseId: string,
    metadata: Record<string, any>
  ) => {
    const { exercises } = get();
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (!exercise) return;
    set({
      exercises: exercises.map((e) =>
        e.id === exerciseId ? { ...e, metadata } : e
      ),
    });
  },
});
