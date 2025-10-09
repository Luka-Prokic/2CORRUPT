import { WorkoutStore, FlowSlice, SessionExercise } from "../types";
import { StateCreator } from "zustand";

export const createFlowSlice: StateCreator<WorkoutStore, [], [], FlowSlice> = (
  set,
  get
) => ({
  isThereNext: false,
  isTherePrev: false,

  goToNextExercise: () => {
    const { activeSession, activeExercise, setActiveExercise } = get();
    if (!activeSession || !activeExercise) return;

    const flatExercises: SessionExercise[] = [];
    activeSession.layout.forEach((item) => {
      if (item.type === "exercise") flatExercises.push(item.exercise);
      else if (item.type === "superset" || item.type === "circuit")
        flatExercises.push(...item.exercises);
    });

    const index = flatExercises.findIndex((ex) => ex.id === activeExercise.id);
    if (index < 0 || index === flatExercises.length - 1) return;

    setActiveExercise(flatExercises[index + 1].id);
    get().updateNavigationFlags();
  },

  goToPreviousExercise: () => {
    const { activeSession, activeExercise, setActiveExercise } = get();
    if (!activeSession || !activeExercise) return;

    const flatExercises: SessionExercise[] = [];
    activeSession.layout.forEach((item) => {
      if (item.type === "exercise") flatExercises.push(item.exercise);
      else if (item.type === "superset" || item.type === "circuit")
        flatExercises.push(...item.exercises);
    });

    const index = flatExercises.findIndex((ex) => ex.id === activeExercise.id);
    if (index <= 0) return;

    setActiveExercise(flatExercises[index - 1].id);
    get().updateNavigationFlags();
  },

  updateNavigationFlags: () => {
    const { activeSession, activeExercise } = get();
    if (!activeSession || !activeExercise) {
      set({ isThereNext: false, isTherePrev: false });
      return;
    }

    const flatExercises: SessionExercise[] = [];
    activeSession.layout.forEach((item) => {
      if (item.type === "exercise") flatExercises.push(item.exercise);
      else if (item.type === "superset" || item.type === "circuit")
        flatExercises.push(...item.exercises);
    });

    const index = flatExercises.findIndex((ex) => ex.id === activeExercise.id);
    set({
      isTherePrev: index > 0,
      isThereNext: index >= 0 && index < flatExercises.length - 1,
    });
  },

  getActiveExerciseIndex: () => {
    const { activeSession, activeExercise } = get();
    if (!activeSession || !activeExercise) return null;

    const flatExercises: SessionExercise[] = [];
    activeSession.layout.forEach((item) => {
      if (item.type === "exercise") flatExercises.push(item.exercise);
      else if (item.type === "superset" || item.type === "circuit")
        flatExercises.push(...item.exercises);
    });
    return flatExercises.findIndex((ex) => ex.id === activeExercise.id);
  },
});
