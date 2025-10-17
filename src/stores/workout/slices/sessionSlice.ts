import { StateCreator } from "zustand";
import {
  WorkoutStore,
  WorkoutSession,
  Set,
  DropSet,
  SessionExercise,
  WorkoutTemplate,
} from "../types";
import { nanoid } from "nanoid/non-secure";

/**
 * Session slice: manages active workout sessions
 */
export const createSessionSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  activeSession: null,
  isWorkoutActive: false,
  completedSessions: [],

  startSession: (template?: WorkoutTemplate) => {
    const now = new Date();
    const name =
      `${template?.name} ${now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      })}` ||
      `${now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      
    const newSession: WorkoutSession = {
      id: `session-${nanoid()}`,
      templateId: template?.id || null,
      templateVersion: template?.version || null,
      name: name,
      // e.g. "07/10/2025 10:00"
      startTime: now.toISOString(),
      isActive: true,
      layout: template?.layout || [],
      createdAt: now.toISOString(),
    };

    set({
      activeSession: newSession,
      activeExercise: newSession.layout?.[0] ?? null,
      isWorkoutActive: true,
    });
  },

  completeSession: () => {
    const { activeSession, clearActiveExercise } = get();
    if (!activeSession) return;

    // Clear active exercise first (will auto-sync)
    clearActiveExercise();

    const endTime = new Date().toISOString();
    const startTime = new Date(activeSession.startTime);
    const durationSeconds = Math.floor(
      (new Date(endTime).getTime() - startTime.getTime()) / 1000
    );

    let totalSets = 0;
    let totalReps = 0;
    let totalVolumeKg = 0;

    activeSession.layout.forEach((exercise: SessionExercise) => {
      exercise.sets.forEach((set: Set) => {
        if (set.isCompleted) {
          totalSets++;
          totalReps += set.reps || 0;
          totalVolumeKg += (set.weight || 0) * (set.reps || 0);

          set.dropSets?.forEach((dropSet: DropSet) => {
            totalSets++;
            totalReps += dropSet.reps || 0;
            totalVolumeKg += (dropSet.weight || 0) * (dropSet.reps || 0);
          });
        }
      });
    });

    const completedSession: WorkoutSession = {
      ...activeSession,
      endTime,
      isActive: false,
      totals: { totalSets, totalReps, totalVolumeKg, durationSeconds },
      updatedAt: endTime,
      layout: activeSession.layout,
    };

    set((state) => ({
      activeSession: null,
      isWorkoutActive: false,
      completedSessions: [...state.completedSessions, completedSession],
    }));
  },

  cancelSession: () => {
    const { clearActiveExercise } = get();
    clearActiveExercise();

    set({ activeSession: null, isWorkoutActive: false });
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
    };

    const layout = activeSession.layout;
    const insertIndex = afterItemId
      ? layout.findIndex((item: SessionExercise) => item.id === afterItemId) + 1
      : layout.length;

    const updatedLayout = [...layout];
    updatedLayout.splice(insertIndex, 0, newExercise);

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
   * Remove multiple exercises from the session layout
   */
  removeExercisesFromSession: (exerciseIds: string[]) => {
    const {
      activeSession,
      activeExercise,
      updateNavigationFlags,
      setActiveExercise,
      clearActiveExercise,
    } = get();
    if (!activeSession) return;

    const newLayout = activeSession.layout.filter(
      (item: SessionExercise) => !exerciseIds.includes(item.id)
    );

    let newActiveExerciseId = activeExercise?.id;
    if (exerciseIds.includes(activeExercise?.id ?? "")) {
      newActiveExerciseId = newLayout.length > 0 ? newLayout[0].id : null;
    }

    set({
      activeSession: { ...activeSession, layout: newLayout },
    });

    if (newActiveExerciseId) setActiveExercise(newActiveExerciseId);
    else clearActiveExercise();

    updateNavigationFlags();
  },

  /**
   * Reorder items in the session layout
   */
  reorderSessionItems: (newOrder: SessionExercise[]) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state) => ({
      activeSession: {
        ...state.activeSession!,
        layout: newOrder,
      },
    }));
  },

  updateSessionField: (
    sessionId: string,
    field: keyof WorkoutSession,
    value: WorkoutSession[keyof WorkoutSession]
  ) =>
    set((state) => {
      const updatedSessions = state.completedSessions.map((s) =>
        s.id === sessionId
          ? { ...s, [field]: value, updatedAt: new Date().toISOString() }
          : s
      );

      // Handle active session too
      const updatedActiveSession =
        state.activeSession?.id === sessionId
          ? {
              ...state.activeSession,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : state.activeSession;

      return {
        completedSessions: updatedSessions,
        activeSession: updatedActiveSession,
      };
    }),
});
