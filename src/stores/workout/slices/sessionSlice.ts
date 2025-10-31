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

// Workout session (single source of truth for a performed workout)
const now = new Date();
const start = new Date(now.getTime() - 80 * 60 * 1000).toISOString(); // 1h 20m later
const end = now.toISOString();

const start2 = new Date(now.getTime() - 1090 * 60 * 1000).toISOString();
const end2 = new Date(now.getTime() - 1000 * 60 * 1000).toISOString();

const start3 = new Date(now.getTime() - 990 * 60 * 1000).toISOString();
const end3 = new Date(now.getTime() - 920 * 60 * 1000).toISOString();

const overheadPressExample: SessionExercise = {
  id: "ex-ohp-23123123", // snapshot id
  exerciseInfoId: "ex-ohp", // optional
  name: "Overhead Press",
  prefix: "Barbell", // new field
  primaryMuscles: ["front delts", "side delts"],
  secondaryMuscles: ["triceps", "rear delts"],
  equipment: ["barbell"],
  notes: "Focus on strict form, avoid arching back",
  sets: [
    {
      id: "set-1",
      reps: 8,
      weight: 60, // in kg
      isCompleted: true,
    },
  ],
  columns: ["Reps", "Weight"], // optional
  restTime: 90, // default rest in seconds
  noRest: false, // this exercise has rest
};

const mockSession: WorkoutSession = {
  id: "mock-sesh",
  name: "Mock 1h20m Workout",
  startTime: start,
  endTime: end,
  isActive: true,
  layout: [overheadPressExample],
  notes: "Mock session for testing",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

const mockSessionTwo: WorkoutSession = {
  id: "mock-two",
  name: "Mock 2 Workout",
  startTime: start2,
  endTime: end2,
  isActive: true,
  layout: [],
  notes: "Mock session for testing",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

const mockSessionThree: WorkoutSession = {
  id: "mock-three",
  name: "Mock 3 Workout",
  startTime: start3,
  endTime: end3,
  isActive: true,
  layout: [],
  notes: "Mock session for testing",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

/**
 * Session slice: manages active workout sessions
 */
export const createSessionSlice: StateCreator<WorkoutStore, [], [], {}> = (
  set,
  get
) => ({
  activeSession: null,
  completedSessions: [mockSession, mockSessionThree, mockSessionTwo],

  startSession: (template?: WorkoutTemplate, layout?: SessionExercise[]) => {
    const { activeSession } = get();
    if (activeSession) return;

    const newLayout = layout
      ? layout.map((ex) => ({
          ...ex,
          sets: ex.sets.map((set) => ({
            ...set,
            isCompleted: false,
          })),
        }))
      : template
      ? template.layout.map((ex) => ({
          ...ex,
          sets: ex.sets.map((set) => ({
            ...set,
            isCompleted: false,
          })),
        }))
      : [];

    const now = new Date();
    const name = template
      ? `${template?.name}`
      : `${now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        })} ${now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

    const newSession: WorkoutSession = {
      id: `session-${nanoid()}`,
      templateId: template?.id || null,
      templateVersion: template?.version || null,
      name: name,
      startTime: now.toISOString(),
      isActive: true,
      layout: newLayout,
      createdAt: now.toISOString(),
      notes: template?.description || "",
    };

    set({
      activeSession: newSession,
      activeExercise: newSession.layout?.[0] ?? null,
      activeTemplate: null,
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
      completedSessions: [...state.completedSessions, completedSession],
    }));
  },

  cancelSession: () => {
    const { clearActiveExercise } = get();
    clearActiveExercise();

    set({ activeSession: null });
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

  removeSession: (sessionId: string) => {
    const { clearActiveExercise, completedSessions } = get();

    const newSessions = completedSessions.filter((s) => s.id !== sessionId);

    set({
      completedSessions: newSessions,
      activeSession: null,
    });
    clearActiveExercise();
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
