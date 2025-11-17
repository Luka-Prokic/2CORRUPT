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
    const { activeSession, activeTemplate, activeExercise, setActiveExercise } =
      get();

    const layout = activeSession?.layout ?? activeTemplate?.layout;
    if (!layout || !activeExercise) return;

    const currentIndex = layout.findIndex((f) => f.id === activeExercise.id);
    if (currentIndex < 0 || currentIndex === layout.length - 1) return;

    setActiveExercise(layout[currentIndex + 1].id);
    get().updateNavigationFlags();
  },

  goToPreviousExercise: () => {
    const { activeSession, activeTemplate, activeExercise, setActiveExercise } =
      get();

    const layout = activeSession?.layout ?? activeTemplate?.layout;
    if (!layout || !activeExercise) return;

    const currentIndex = layout.findIndex((f) => f.id === activeExercise.id);
    if (currentIndex <= 0) return;

    setActiveExercise(layout[currentIndex - 1].id);
    get().updateNavigationFlags();
  },

  updateNavigationFlags: () => {
    const { activeSession, activeTemplate, activeExercise } = get();

    const layout = activeSession?.layout ?? activeTemplate?.layout;
    if (!layout || !activeExercise) {
      set({ isThereNext: false, isTherePrev: false });
      return;
    }

    const currentIndex = layout.findIndex((f) => f.id === activeExercise.id);
    set({
      isTherePrev: currentIndex > 0,
      isThereNext: currentIndex >= 0 && currentIndex < layout.length - 1,
    });
  },

  getActiveExerciseIndex: () => {
    const { activeSession, activeTemplate, activeExercise } = get();
    const layout = activeSession?.layout ?? activeTemplate?.layout;
    if (!layout || !activeExercise) return null;

    return layout.findIndex((f) => f.id === activeExercise.id);
  },
});
