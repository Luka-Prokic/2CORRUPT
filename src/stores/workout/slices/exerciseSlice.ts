import { StateCreator } from "zustand";
import {
  WorkoutStore,
  SessionExercise,
  Set,
  DropSet,
  SessionLayoutItem,
} from "../types";
import { exercisesDefList, EmptySet } from "../../../config/constants/defaults";

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

    // Find the exercise in the session layout (could be top-level or nested)
    let foundExercise: SessionExercise | null = null;

    for (const item of activeSession.layout) {
      if (item.type === "exercise" && item.exercise.id === exerciseId) {
        foundExercise = item.exercise;
        break;
      } else if (item.type === "superset" || item.type === "circuit") {
        const nested = item.exercises.find((ex) => ex.id === exerciseId);
        if (nested) {
          foundExercise = nested;
          break;
        }
      }
    }

    if (foundExercise) {
      // Create a deep copy to edit independently
      set({
        activeExercise: {
          ...foundExercise,
          sets: foundExercise.sets.map((s) => ({
            ...s,
            dropSets: s.dropSets ? [...s.dropSets] : undefined,
          })),
        },
      });
    }

    //update navigation flags in flowSlice
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

    const layout = activeSession.layout.map((item: SessionLayoutItem) => {
      if (item.type === "exercise" && item.exercise.id === activeExercise.id) {
        return {
          ...item,
          exercise: {
            ...activeExercise,
            sets: activeExercise.sets.map((s) => ({
              ...s,
              dropSets: s.dropSets ? [...s.dropSets] : undefined,
            })),
          },
        };
      } else if (item.type === "superset" || item.type === "circuit") {
        const hasExercise = item.exercises.some(
          (ex) => ex.id === activeExercise.id
        );
        if (hasExercise) {
          return {
            ...item,
            exercises: item.exercises.map((ex: SessionExercise) =>
              ex.id === activeExercise.id
                ? {
                    ...activeExercise,
                    sets: activeExercise.sets.map((s) => ({
                      ...s,
                      dropSets: s.dropSets ? [...s.dropSets] : undefined,
                    })),
                  }
                : ex
            ),
          };
        }
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
      id: `set-${Date.now()}-${Math.random().toString(36)}`,
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
      id: `drop-${Date.now()}-${Math.random().toString(36)}`,
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

    const newExercise: SessionExercise = {
      ...exercise,
      id: exercise.id || Date.now().toString(),
      sets: exercise.sets || [EmptySet],
    };

    const newLayoutItem: SessionLayoutItem = {
      type: "exercise",
      id: newExercise.id,
      exercise: newExercise,
    };

    const layout = activeSession.layout;
    const insertIndex = afterItemId
      ? layout.findIndex((item: SessionLayoutItem) => item.id === afterItemId) +
        1
      : layout.length;

    const updatedLayout = [...layout];
    updatedLayout.splice(insertIndex, 0, newLayoutItem);

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
   * Remove an item from the session layout
   */
  removeItemFromSession: (layoutItemId: string) => {
    const { activeSession, updateNavigationFlags, checkActiveExercise } = get();
    if (!activeSession) return;

    const layout = activeSession.layout.filter(
      (i: SessionLayoutItem) => i.id !== layoutItemId
    );

    set((state) => ({
      activeSession: { ...state.activeSession!, layout },
    }));

    checkActiveExercise();
    //update navigation flags in flowSlice
    updateNavigationFlags();
  },

  /**
   * Reorder items in the session layout
   */
  reorderSessionItems: (newOrder: SessionLayoutItem[]) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state) => ({
      activeSession: {
        ...state.activeSession!,
        layout: newOrder,
      },
    }));
  },

  /**
   * Check if the active exercise still exists in the session layout
   */
  checkActiveExercise: () => {
    const {
      activeSession,
      activeExercise,
      setActiveExercise,
      clearActiveExercise,
    } = get();
    if (!activeSession) return;

    const layout = activeSession.layout;
    // Check if current activeExercise still exists
    const isThereActiveExercise = layout.some((item: SessionLayoutItem) => {
      if (item.type === "exercise")
        return item.exercise.id === activeExercise?.id;
      // For supersets/circuits, check exercises array
      if (item.type === "superset" || item.type === "circuit") {
        return item.exercises.some((ex) => ex.id === activeExercise?.id);
      }
      return false;
    });

    if (!isThereActiveExercise) {
      // Find the first available exercise in layout
      for (const item of layout) {
        if (item.type === "exercise") {
          setActiveExercise(item.exercise.id);
          return;
        }
        if (item.type === "superset" || item.type === "circuit") {
          if (item.exercises.length > 0) {
            setActiveExercise(item.exercises[0].id);
            return;
          }
        }
      }
    }
    clearActiveExercise();
  },
});
