import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import {
  WorkoutStore,
  SplitPlanSlice,
  SplitPlan,
  SplitPlanHistoryEntry,
  IsoDateString,
  SplitPlanDay,
  SplitPlanWorkout,
  ActiveSplitPlanState,
} from "../types";

/**
 * Helper to create a SplitPlanWorkout object
 */
function createSplitPlanWorkout(
  templateId: string,
  scheduledAt?: IsoDateString | null
): SplitPlanWorkout {
  const now = new Date().toISOString() as IsoDateString;
  return {
    id: `split-workout-${nanoid()}`,
    templateId,
    createdAt: now,
    updatedAt: now,
    ...(scheduledAt ? { scheduledAt } : {}),
  };
}

// Default empty split
export const NoSplit: SplitPlan = {
  id: "no-split",
  name: "No Split",
  description:
    "Default placeholder split with balanced training and rest days.",
  metadata: {},
  createdAt: new Date().toISOString() as IsoDateString,
  updatedAt: undefined,
  split: [],
  splitLength: 7,
  activeLength: 5,
};

// Default history entry for NoSplit
export const ActiveNoSplitHistoryEntry: SplitPlanHistoryEntry = {
  id: "no-split-history",
  plan: NoSplit,
  startTime: new Date().toISOString() as IsoDateString,
  startDay: 0,
  endTime: undefined,
};

export const createSplitPlanSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  SplitPlanSlice
> = (set, get) => ({
  splitPlans: [],
  activeSplitPlan: {
    plan: NoSplit,
    startDay: 0,
    startTime: new Date().toISOString(),
  },
  historySplitPlan: [ActiveNoSplitHistoryEntry],

  // ----------------- CRUD -----------------
  createSplitPlan: (plan?: Partial<SplitPlan>) => {
    const { splitPlans } = get();
    const newSplit: SplitPlanDay[] = (plan?.split || []).map((d) => ({
      id: d?.id || `split-day-${nanoid()}`,
      workouts: (d?.workouts || []) as SplitPlanWorkout[],
      isRest: d?.isRest ?? false,
    }));

    const splitLength = newSplit.length;
    const activeLength = newSplit.filter((d) => !d.isRest).length;

    const newPlan: SplitPlan = {
      id: `split-${nanoid()}`,
      name: plan?.name || "New Split",
      split: newSplit,
      splitLength,
      activeLength,
      description: plan?.description || "",
      metadata: plan?.metadata || {},
      createdAt: new Date().toISOString() as IsoDateString,
      updatedAt: new Date().toISOString() as IsoDateString,
    };

    set({ splitPlans: [...splitPlans, newPlan] });
    return newPlan.id;
  },

  editSplitPlan: (planId: string) =>
    get().splitPlans.find((p) => p.id === planId) || null,

  updateSplitPlanField: <K extends keyof SplitPlan>(
    planId: string,
    field: K,
    value: SplitPlan[K]
  ) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const updated: SplitPlan = {
          ...p,
          [field]: value,
          updatedAt: new Date().toISOString(),
        };
        updated.activeLength = updated.split.filter((d) => !d.isRest).length;
        updated.splitLength = updated.split.length;
        return updated;
      }),
    }));
  },

  deleteSplitPlan: (planId: string) => {
    set((state) => ({
      activeSplitPlan:
        state.activeSplitPlan?.plan.id === planId
          ? { plan: NoSplit, startDay: 0, startTime: new Date().toISOString() }
          : state.activeSplitPlan,
      splitPlans: state.splitPlans.filter((p) => p.id !== planId),
    }));
  },

  // ----------------- Workout / Day Management -----------------
  addWorkoutToDay: (planId, dayIndex, templateId) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex])
          split[dayIndex] = {
            id: `split-day-${nanoid()}`,
            workouts: [],
            isRest: false,
          };
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: [
            ...split[dayIndex].workouts,
            createSplitPlanWorkout(templateId),
          ],
        };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  removeWorkoutFromDay: (planId, dayIndex, templateId) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: split[dayIndex].workouts.filter(
            (w) => w.templateId !== templateId
          ),
        };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  updateWorkoutInDay: (planId, dayIndex, workoutId, updates) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: split[dayIndex].workouts.map((w) =>
            w.id === workoutId
              ? { ...w, ...updates, updatedAt: new Date().toISOString() }
              : w
          ),
        };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  swapWorkoutTemplate: (planId, dayIndex, workoutId, newTemplateId) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        const workouts = [...split[dayIndex].workouts];
        const idx = workouts.findIndex((w) => w.id === workoutId);
        if (idx === -1) return p;
        const oldWorkout = workouts[idx];
        workouts[idx] = createSplitPlanWorkout(newTemplateId);
        split[dayIndex] = { ...split[dayIndex], workouts };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  reorderWorkoutsInDay: (planId, dayIndex, newOrder) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        const current = split[dayIndex].workouts;
        const lookup = new Map(current.map((w) => [w.id, w]));
        const reordered: SplitPlanWorkout[] = [];
        newOrder.forEach((id) => {
          const w = lookup.get(id);
          if (w) {
            reordered.push(w);
            lookup.delete(id);
          }
        });
        current.forEach((w) => {
          if (lookup.has(w.id)) reordered.push(w);
        });
        split[dayIndex] = { ...split[dayIndex], workouts: reordered };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  addDayToSplit: (planId, day, dayIndex) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        const newDay: SplitPlanDay = {
          id: day?.id || `split-day-${nanoid()}`,
          workouts: day?.workouts || [],
          isRest: day?.isRest ?? false,
        };
        if (dayIndex === undefined || dayIndex < 0 || dayIndex > split.length)
          split.push(newDay);
        else split.splice(dayIndex, 0, newDay);
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  removeDayFromSplit: (planId, dayIndex) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (dayIndex < 0 || dayIndex >= split.length) return p;
        split.splice(dayIndex, 1);
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  updateSplitDayField: (planId, dayIndex, field, value) => {
    set((state) => {
      const plan = state.splitPlans.find((p) => p.id === planId);
      if (!plan) return state;
      const split = [...plan.split];
      const day = split[dayIndex];
      if (!day) return state;
      split[dayIndex] = { ...day, [field]: value };
      return {
        ...state,
        splitPlans: state.splitPlans.map((p) =>
          p.id === planId
            ? {
                ...p,
                split,
                activeLength: split.filter((d) => !d.isRest).length,
                splitLength: split.length,
                updatedAt: new Date().toISOString(),
              }
            : p
        ),
      };
    });
  },

  toggleDayRest: (planId, dayIndex) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        split[dayIndex] = {
          ...split[dayIndex],
          isRest: !split[dayIndex].isRest,
        };
        return {
          ...p,
          split,
          activeLength: split.filter((d) => !d.isRest).length,
          splitLength: split.length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  reorderSplitDays: (planId, newOrder: SplitPlanDay[]) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        return {
          ...p,
          split: newOrder, // directly replace with new array
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },
  

  // ----------------- Active Split -----------------
  setActiveSplitPlan: (plan, startDay = 0, startTime) => {
    const now = startTime || new Date().toISOString();
    const today = new Date().toDateString();
    const state = get();

    // 1. End any currently active split
    const endedHistory = state.historySplitPlan.map((h) =>
      !h.endTime ? { ...h, endTime: now } : h
    );

    // 2. Remove any history entries for this plan created today
    const filteredHistory = endedHistory.filter((h) => {
      const entryDate = new Date(h.startTime).toDateString();
      return !(entryDate === today && h.plan.id === plan.id);
    });

    // 3. Create new ActiveSplitPlanState
    const active: ActiveSplitPlanState = {
      plan: JSON.parse(JSON.stringify(plan)),
      startDay,
      startTime: now,
    };

    // 4. Add corresponding history entry
    const historyEntry: SplitPlanHistoryEntry = {
      id: nanoid(),
      plan: active.plan,
      startDay: active.startDay,
      startTime: active.startTime,
    };

    set({
      activeSplitPlan: active,
      historySplitPlan: [...filteredHistory, historyEntry],
    });
  },

  updateActiveSplitStartDay: (newStartDay) => {
    set((state) => {
      if (!state.activeSplitPlan) return state;

      const now = new Date().toISOString();
      const today = new Date().toDateString();

      // Update activeSplitPlan
      const updatedActive: ActiveSplitPlanState = {
        ...state.activeSplitPlan,
        startDay: newStartDay,
      };

      // 1. End any other currently active splits (optional, mostly for safety)
      const endedHistory = state.historySplitPlan.map((h) =>
        !h.endTime && h.plan.id !== updatedActive.plan.id
          ? { ...h, endTime: now }
          : h
      );

      // 2. Remove any history entries for this plan created today
      const filteredHistory = endedHistory.filter((h) => {
        const entryDate = new Date(h.startTime).toDateString();
        return !(entryDate === today && h.plan.id === updatedActive.plan.id);
      });

      // 3. Add updated history entry for today
      const newHistoryEntry: SplitPlanHistoryEntry = {
        id: nanoid(),
        plan: JSON.parse(JSON.stringify(updatedActive.plan)),
        startDay: newStartDay,
        startTime: updatedActive.startTime, // keep original startTime
        endTime: updatedActive.endTime,
      };

      return {
        ...state,
        activeSplitPlan: updatedActive,
        historySplitPlan: [...filteredHistory, newHistoryEntry],
      };
    });
  },

  endActiveSplitPlan: (endTime) => {
    const now = endTime || new Date().toISOString();
    const state = get();
    const updatedHistory = state.historySplitPlan.map((h) =>
      !h.endTime ? { ...h, endTime: now } : h
    );
    const noSplitHistoryEntry: SplitPlanHistoryEntry = {
      id: `no-split-history-${Date.now()}`,
      plan: NoSplit,
      startTime: now,
      startDay: 0,
    };
    set({
      activeSplitPlan: { plan: NoSplit, startDay: 0, startTime: now },
      historySplitPlan: [...updatedHistory, noSplitHistoryEntry],
    });
  },

  // ----------------- Getters -----------------
  getSplitById: (planId) => get().splitPlans.find((p) => p.id === planId),
  getActiveSplitStartDay: () => get().activeSplitPlan?.startDay ?? null,
});
