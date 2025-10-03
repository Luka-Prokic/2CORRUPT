import { StateCreator } from "zustand";
import { WorkoutStore, SessionExercise, WorkoutSet } from "../types";

/**
 * Exercise slice: manages exercises within workout sessions
 */
export const createExerciseSlice: StateCreator<WorkoutStore, [], [], any> = (set, get) => ({
  addExerciseToSession: (exercise: any, afterItemId?: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const newExercise: SessionExercise = {
      id: exercise.id || Date.now().toString(),
      exerciseInfoId: exercise.exerciseInfoId || exercise.id,
      name: exercise.name,
      primaryMuscles: exercise.primaryMuscles || [],
      secondaryMuscles: exercise.secondaryMuscles || [],
      equipment: exercise.equipment || [],
      sets: [], // Start with empty sets
    };

    const newLayoutItem = {
      type: "exercise" as const,
      id: newExercise.id,
      exercise: newExercise,
    };

    const items = activeSession.items;
    const insertIndex = afterItemId ? items.findIndex((item: any) => item.id === afterItemId) + 1 : items.length;
    
    const updatedItems = [...items];
    updatedItems.splice(insertIndex, 0, newLayoutItem);

    set((state: any) => ({
      activeSession: { ...state.activeSession, items: updatedItems },
    }));
  },

  removeItemFromSession: (layoutItemId: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const items = activeSession.items.filter((i: any) => i.id !== layoutItemId);

    set((state: any) => ({
      activeSession: { ...state.activeSession, items },
    }));
  },

  reorderSessionItems: (fromIndex: any, toIndex: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const items = [...activeSession.items];
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);

    set((state: any) => ({
      activeSession: { ...state.activeSession, items },
    }));
  },

  updateSessionItemNotes: (layoutItemId: any, notes: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const items = activeSession.items.map((i: any) => {
      if (i.id === layoutItemId && i.type === "exercise") {
        return {
          ...i,
          exercise: { ...i.exercise, notes },
        };
      }
      return i;
    });

    set((state: any) => ({
      activeSession: { ...state.activeSession, items },
    }));
  },

  addSetToExercise: (layoutItemId: any, reps?: any, weight?: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      reps: reps || 10,
      weight: weight || 135,
      isCompleted: false,
      dropSets: [],
    };

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.id === layoutItemId && item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: [...item.exercise.sets, newSet],
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => {
                if (exercise.id === layoutItemId) {
                  return {
                    ...exercise,
                    sets: [...exercise.sets, newSet],
                  };
                }
                return exercise;
              }),
            };
          }
          return item;
        }),
      },
    }));
  },

  removeSetFromExercise: (layoutItemId: any, setId: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.id === layoutItemId && item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.filter((set: WorkoutSet) => set.id !== setId),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => {
                if (exercise.id === layoutItemId) {
                  return {
                    ...exercise,
                    sets: exercise.sets.filter((set: WorkoutSet) => set.id !== setId),
                  };
                }
                return exercise;
              }),
            };
          }
          return item;
        }),
      },
    }));
  },
});