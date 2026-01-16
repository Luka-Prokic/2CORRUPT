import { StateCreator } from "zustand";
import { RestSlice, WorkoutStore } from "../types";

export const createRestSlice: StateCreator<WorkoutStore, [], [], RestSlice> = (
  set,
  get
) => ({
  // STATE
  restingExerciseId: null,
  restingSetId: null,
  startRestTime: null, // seconds
  estEndRestTime: null, // seconds, absolute end timestamp

  // ACTIONS
  startRest: (exerciseId, setId, duration) => {
    const nowSec = Math.floor(Date.now() / 1000);
    set({
      restingExerciseId: exerciseId,
      restingSetId: setId,
      startRestTime: nowSec,
      estEndRestTime: nowSec + duration, // now + duration (seconds)
    });
  },

  // endRest: optional overrideSeconds, otherwise compute REAL rest from startRestTime
  endRest: (secconds) => {
    const {
      restingExerciseId,
      restingSetId,
      startRestTime,
      updateSetInActiveExercise,
    } = get();

    if (!restingExerciseId || !restingSetId || !startRestTime) return;

    const nowSec = Math.floor(Date.now() / 1000);

    const restSeconds =
      secconds !== undefined ? secconds : Math.max(0, nowSec - startRestTime);

    // update set with actual rest
    updateSetInActiveExercise(restingSetId, {
      isCompleted: true,
      restSeconds,
    });

    // clear rest state
    set({
      restingExerciseId: null,
      restingSetId: null,
      startRestTime: null,
      estEndRestTime: null,
    });
  },

  // directly set a new estimated end timestamp (seconds)
  updateEstEndRestTime: (newEndSec) => {
    set({ estEndRestTime: newEndSec });
  },

  // add seconds to estimated end timestamp
  extendEstEndRestTime: (amount) => {
    const { estEndRestTime } = get();
    const now = Math.floor(Date.now() / 1000);
    if (!estEndRestTime) {
      set({ estEndRestTime: now + amount });
      return;
    }
    set({ estEndRestTime: estEndRestTime + amount });
  },

  // remove seconds; if removing goes past now -> end rest
  reduceEstEndRestTime: (amount) => {
    const { estEndRestTime } = get();
    const now = Math.floor(Date.now() / 1000);
    if (!estEndRestTime) return;

    if (estEndRestTime - amount <= now) {
      // dropping below now => pretend user pressed end (use endRest())
      get().endRest();
      return;
    }

    set({ estEndRestTime: estEndRestTime - amount });
  },
});
