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
  } as unknown as SplitPlanWorkout;
}

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

export const ActiveNoSplitHistoryEntry: SplitPlanHistoryEntry = {
  id: "no-split-history",
  plan: NoSplit,
  startTime: new Date().toISOString() as IsoDateString,
  endTime: undefined,
};

export const createSplitPlanSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  SplitPlanSlice
> = (set, get) => ({
  splitPlans: [],
  activeSplitPlan: NoSplit,
  historySplitPlan: [ActiveNoSplitHistoryEntry],

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
        const updated = {
          ...p,
          [field]: value,
          updatedAt: new Date().toISOString(),
        } as SplitPlan;
        updated.activeLength = updated.split.filter((d) => !d.isRest).length;
        updated.splitLength = updated.split.length;
        return updated;
      }),
    }));
  },

  deleteSplitPlan: (planId: string) => {
    set((state) => ({
      activeSplitPlan:
        state.activeSplitPlan.id === planId ? NoSplit : state.activeSplitPlan,
      splitPlans: state.splitPlans.filter((p) => p.id !== planId),
    }));
  },

  addWorkoutToDay: (
    planId: string,
    dayIndex: number,
    templateId: string,
    scheduledAt?: IsoDateString | null
  ) => {
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
        const newWorkout = createSplitPlanWorkout(templateId, scheduledAt);
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: [...split[dayIndex].workouts, newWorkout],
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

  removeWorkoutFromDay: (planId, dayIndex, workoutIdOrTemplateId) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;

        const workouts = [...split[dayIndex].workouts];
        const byIdIndex = workouts.findIndex(
          (w) => w.id === workoutIdOrTemplateId
        );
        if (byIdIndex !== -1) workouts.splice(byIdIndex, 1);
        else {
          const byTemplateIndex = workouts.findIndex(
            (w) => w.templateId === workoutIdOrTemplateId
          );
          if (byTemplateIndex !== -1) workouts.splice(byTemplateIndex, 1);
        }

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

  updateWorkoutInDay: (planId, dayIndex, workoutId, updates) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;

        const workouts = split[dayIndex].workouts.map((w) => {
          if (w.id === workoutId) {
            return {
              ...w,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
          }
          return w;
        });

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

  swapWorkoutTemplate: (planId, dayIndex, workoutId, newTemplateId) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;

        const workouts = [...split[dayIndex].workouts];
        const workoutIndex = workouts.findIndex((w) => w.id === workoutId);
        if (workoutIndex === -1) return p;

        const oldWorkout = workouts[workoutIndex];
        const scheduledAt = oldWorkout.scheduledAt;

        // Remove old workout
        workouts.splice(workoutIndex, 1);

        // Create new workout with new template, preserving scheduledAt
        const newWorkout = createSplitPlanWorkout(newTemplateId, scheduledAt);

        // Insert new workout at the same position
        workouts.splice(workoutIndex, 0, newWorkout);

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

  reorderSplitDays: (planId, newOrder) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        const lookup = new Map(split.map((d) => [d.id, d]));
        const reordered: SplitPlanDay[] = [];
        newOrder.forEach((id) => {
          const d = lookup.get(id);
          if (d) {
            reordered.push(d);
            lookup.delete(id);
          }
        });
        split.forEach((d) => {
          if (lookup.has(d.id)) reordered.push(d);
        });
        return { ...p, split: reordered, updatedAt: new Date().toISOString() };
      }),
    }));
  },

  setActiveSplitPlan: (plan) => {
    const now = new Date().toISOString();
    const state = get();
    if (state.activeSplitPlan) {
      const updatedHistory = state.historySplitPlan.map((h) =>
        !h.endTime ? { ...h, endTime: now } : h
      );
      set({ historySplitPlan: updatedHistory });
    }
    const historyEntry: SplitPlanHistoryEntry = {
      id: nanoid(),
      plan: JSON.parse(JSON.stringify(plan)),
      startTime: now,
    };
    set({
      activeSplitPlan: plan,
      historySplitPlan: [...state.historySplitPlan, historyEntry],
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
      endTime: undefined,
    };
    set({
      activeSplitPlan: NoSplit,
      historySplitPlan: [...updatedHistory, noSplitHistoryEntry],
    });
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
          splitLength: split.length,
          activeLength: split.filter((d) => !d.isRest).length,
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
          splitLength: split.length,
          activeLength: split.filter((d) => !d.isRest).length,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  updateSplitDayField: (planId, dayIndex, field, value) => {
    set((state) => {
      const planIndex = state.splitPlans.findIndex((p) => p.id === planId);
      if (planIndex === -1) return state;
      const plan = state.splitPlans[planIndex];
      const day = plan.split[dayIndex];
      if (!day) return state;
      const updatedDay = { ...day, [field]: value };
      const updatedSplit = [...plan.split];
      updatedSplit[dayIndex] = updatedDay;
      const updatedPlan = {
        ...plan,
        split: updatedSplit,
        activeLength: updatedSplit.filter((d) => !d.isRest).length,
        splitLength: updatedSplit.length,
        updatedAt: new Date().toISOString(),
      };
      const updatedPlans = [...state.splitPlans];
      updatedPlans[planIndex] = updatedPlan;
      return { splitPlans: updatedPlans };
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

  getSplitById: (planId) => get().splitPlans.find((p) => p.id === planId),
});
