import { ExerciseInfo, WorkoutStore } from "../types";
import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import { useUserStore } from "../../user/useUserStore";

export const createDraftSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  // State
  draftExercise: null,
  placeholderExercise: null,

  // --- Draft Logic ---
  startDraftExercise: (exercise?: ExerciseInfo) => {
    const user = useUserStore.getState().user;

    const newDraftExercise: ExerciseInfo = {
      ...(exercise ?? {}),
      id: `exercise-${nanoid()}`,
      defaultName: exercise?.defaultName || { en: "", rs: "" },
      userId: user?.id,
      updatedAt: new Date().toISOString(),
    };

    set({
      draftExercise: { ...newDraftExercise },
      placeholderExercise: { ...(exercise ?? null) },
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
    const user = useUserStore.getState().user;
    if (!draftExercise) return;

    const savedExercise: ExerciseInfo = {
      ...draftExercise,
      updatedAt: new Date().toISOString(),
      userId: user?.id,
    };
    const newExercises = [...exercises, savedExercise];
    set({
      exercises: newExercises,
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
    const user = useUserStore.getState().user;
    const exercise = exercises.find((e) => e.id === exerciseId);

    if (!user || !exercise || exercise.userId !== user?.id) return;

    const newExercises = exercises.filter(
      (e) => e.id !== exerciseId && e.userId !== user?.id
    );

    set({
      exercises: newExercises,
      draftExercise: null,
      placeholderExercise: null,
    });
  },
});
