import { WorkoutStore, FlowSlice, SessionExercise } from "../types";
import { StateCreator } from "zustand";

export type FlatItem = {
  exercise: SessionExercise;
  parentGroupId?: string; // present if part of superset/circuit
};

export const createFlowSlice: StateCreator<WorkoutStore, [], [], FlowSlice> = (
  set,
  get
) => ({
  isThereNext: false,
  isTherePrev: false,

  goToNextExercise: () => {
    const { activeSession, activeExercise, setActiveExercise } = get();
    if (!activeSession || !activeExercise) return;

    const flat = activeSession.layout;
    const currentIndex = flat.findIndex((f) => f.id === activeExercise.id);
    if (currentIndex < 0 || currentIndex === flat.length - 1) return;

    setActiveExercise(flat[currentIndex + 1].id);
    get().updateNavigationFlags();
  },

  goToPreviousExercise: () => {
    const { activeSession, activeExercise, setActiveExercise } = get();
    if (!activeSession || !activeExercise) return;

    const flat = activeSession.layout;
    const currentIndex = flat.findIndex((f) => f.id === activeExercise.id);
    if (currentIndex <= 0) return;

    setActiveExercise(flat[currentIndex - 1].id);
    get().updateNavigationFlags();
  },

  updateNavigationFlags: () => {
    const { activeSession, activeExercise } = get();
    if (!activeSession || !activeExercise) {
      set({ isThereNext: false, isTherePrev: false });
      return;
    }

    const flat = activeSession.layout;
    const currentIndex = flat.findIndex((f) => f.id === activeExercise.id);

    set({
      isTherePrev: currentIndex > 0,
      isThereNext: currentIndex >= 0 && currentIndex < flat.length - 1,
    });
  },

  getActiveExerciseIndex: () => {
    const { activeSession, activeExercise } = get();
    if (!activeSession || !activeExercise) return null;

    const flat = activeSession.layout;
    return flat.findIndex((f) => f.id === activeExercise.id);
  },
});
