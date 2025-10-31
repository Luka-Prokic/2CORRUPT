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

const now = new Date();
// 1 → today
const start = new Date(now.getTime() - 80 * 60 * 1000).toISOString();
const end = now.toISOString();

// 2 → yesterday
const start2 = new Date(
  now.getTime() - 24 * 60 * 60 * 1000 - 90 * 60 * 1000
).toISOString();
const end2 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

// 3 → day before yesterday
const start3 = new Date(
  now.getTime() - 2 * 24 * 60 * 60 * 1000 - 70 * 60 * 1000
).toISOString();
const end3 = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();

//
// --- EXERCISES ---
//

const makeSet = (reps: number, weight: number) => ({
  id: `set-${nanoid()}`,
  reps,
  weight,
  isCompleted: true,
});

const overheadPressExample: SessionExercise = {
  id: "ex-ohp-23123123",
  exerciseInfoId: "ex-ohp",
  name: "Overhead Press",
  prefix: "Barbell",
  primaryMuscles: ["front delts", "side delts"],
  secondaryMuscles: ["triceps", "rear delts"],
  equipment: ["barbell"],
  notes: "Focus on strict form, avoid arching back",
  sets: [makeSet(8, 60), makeSet(6, 62.5), makeSet(5, 65)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

const benchPressExample: SessionExercise = {
  id: "ex-bench-press-" + nanoid(),
  exerciseInfoId: "ex-bench-press",
  name: "Barbell Bench Press",
  prefix: "Barbell",
  primaryMuscles: ["mid chest"],
  secondaryMuscles: ["triceps", "front delts"],
  equipment: ["barbell", "bench"],
  notes: "Pause slightly on the chest for better control",
  sets: [makeSet(10, 80), makeSet(8, 85), makeSet(6, 90)],
  columns: ["Reps", "Weight"],
  restTime: 120,
  noRest: false,
};

const barbellRowExample: SessionExercise = {
  id: "ex-barbell-row-" + nanoid(),
  exerciseInfoId: "ex-barbell-row",
  name: "Barbell Row",
  prefix: "Barbell",
  primaryMuscles: ["lats", "rear delts"],
  secondaryMuscles: ["biceps", "mid traps"],
  equipment: ["barbell"],
  notes: "Keep back parallel to the floor and pull explosively",
  sets: [makeSet(8, 70), makeSet(8, 75), makeSet(6, 80)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

const backSquatExample: SessionExercise = {
  id: "ex-back-squat-" + nanoid(),
  exerciseInfoId: "ex-back-squat",
  name: "Back Squat",
  prefix: "Barbell",
  primaryMuscles: ["quads", "glutes"],
  secondaryMuscles: ["hamstrings", "core"],
  equipment: ["barbell", "rack"],
  notes: "Full depth, maintain upright torso",
  sets: [makeSet(8, 100), makeSet(6, 110), makeSet(5, 115)],
  columns: ["Reps", "Weight"],
  restTime: 150,
  noRest: false,
};

const deadliftExample: SessionExercise = {
  id: "ex-deadlift-" + nanoid(),
  exerciseInfoId: "ex-deadlift",
  name: "Conventional Deadlift",
  prefix: "Barbell",
  primaryMuscles: ["hamstrings", "glutes", "lower back"],
  secondaryMuscles: ["mid traps", "forearms"],
  equipment: ["barbell"],
  notes: "Reset every rep, keep bar close to the shins",
  sets: [makeSet(5, 130), makeSet(5, 135), makeSet(3, 140)],
  columns: ["Reps", "Weight"],
  restTime: 180,
  noRest: false,
};

const dipsExample: SessionExercise = {
  id: "ex-dips-" + nanoid(),
  exerciseInfoId: "ex-dips",
  name: "Weighted Dips",
  prefix: "Bodyweight",
  primaryMuscles: ["mid chest"],
  secondaryMuscles: ["triceps", "front delts"],
  equipment: ["dip-bar"],
  notes: "Slight forward lean to target chest",
  sets: [makeSet(10, 10), makeSet(8, 15), makeSet(6, 20)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

//
// --- MOCK SESSIONS ---
//

export const mockSession: WorkoutSession = {
  id: "mock-one",
  name: "Mock 1",
  startTime: start,
  endTime: end,
  isActive: true,
  layout: [benchPressExample, overheadPressExample, barbellRowExample],
  notes: "Mock push-pull session for testing",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

export const mockSessionTwo: WorkoutSession = {
  id: "mock-two",
  name: "Mock 2",
  startTime: start2,
  endTime: end2,
  isActive: true,
  layout: [backSquatExample, deadliftExample],
  notes: "Mock lower body day",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

export const mockSessionThree: WorkoutSession = {
  id: "mock-three",
  name: "Mock 3",
  startTime: start3,
  endTime: end3,
  isActive: true,
  layout: [dipsExample, overheadPressExample],
  notes: "Mock upper body finisher session",
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
