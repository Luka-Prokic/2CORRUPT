import { ExerciseInfo, WorkoutStore } from "../types";
import { StateCreator } from "zustand";

// Prototype logic

export const createDraftSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  // State
  exercises: [], // all user-created exercises
  draftExercise: null,
  placeholderExercise: null,

  // --- Draft Logic ---
  startDraftExercise: (exercise?: ExerciseInfo) => {
    // If editing an existing exercise, set it as draft and placeholder
    set({
      draftExercise: exercise ? { ...exercise } : null,
      placeholderExercise: exercise ? { ...exercise } : null,
    });
  },

  updateDraftExercise: (updates: Partial<ExerciseInfo>) => {
    const { draftExercise } = get();
    if (!draftExercise) return;
    set({ draftExercise: { ...draftExercise, ...updates } });
  },

  clearDraftExercise: () => {
    set({ draftExercise: null, placeholderExercise: null });
  },

  saveDraftExercise: () => {
    const { draftExercise, exercises } = get();
    if (!draftExercise) return;

    set({
      exercises: [...exercises, draftExercise],
      draftExercise: null,
      placeholderExercise: null,
    });
  },

  // --- Placeholder Logic ---
  setPlaceholderExercise: (exercise: ExerciseInfo) => {
    set({ placeholderExercise: { ...exercise } });
  },

  clearPlaceholderExercise: () => {
    set({ placeholderExercise: null });
  },

  // --- Remove User-Created Exercise ---
  removeExercise: (exerciseId: string) => {
    const { exercises } = get();
    set({
      exercises: exercises.filter((e) => e.id !== exerciseId),
      draftExercise: null,
      placeholderExercise: null,
    });
  },
});
