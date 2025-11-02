import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import {
  WorkoutStore,
  SplitPlanSlice,
  SplitPlan,
  SplitPlanHistoryEntry,
  IsoDateString,
  SplitPlanDay,
} from "../types";

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

    const newSplit = plan?.split || [];
    const splitLength = newSplit.length || 7;
    const activeLength = newSplit.filter((d) => !d.isRest).length || 5;

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

  editSplitPlan: (planId: string) => {
    const plan = get().splitPlans.find((p) => p.id === planId) || null;
    return plan;
  },

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
        };
        updated.activeLength = updated.split.filter((d) => !d.isRest).length;
        updated.splitLength = updated.split.length;
        return updated;
      }),
    }));
  },

  deleteSplitPlan: (planId: string) => {
    set((state) => ({
      splitPlans: state.splitPlans.filter((p) => p.id !== planId),
      activeSplitPlan:
        state.activeSplitPlan?.id === planId ? null : state.activeSplitPlan,
    }));
  },

  addWorkoutToDay: (planId: string, dayIndex: number, templateId: string) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) split[dayIndex] = { workouts: [] };
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: [...split[dayIndex].workouts, templateId],
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

  removeWorkoutFromDay: (
    planId: string,
    dayIndex: number,
    templateId: string
  ) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        split[dayIndex] = {
          ...split[dayIndex],
          workouts: split[dayIndex].workouts.filter((w) => w !== templateId),
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

  reorderWorkoutsInDay: (
    planId: string,
    dayIndex: number,
    newOrder: string[]
  ) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (!split[dayIndex]) return p;
        split[dayIndex] = { ...split[dayIndex], workouts: newOrder };
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

  setActiveSplitPlan: (plan: SplitPlan) => {
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
    set((state) => ({
      activeSplitPlan: null,
      historySplitPlan: state.historySplitPlan.map((h) =>
        !h.endTime ? { ...h, endTime: now } : h
      ),
    }));
  },

  addDayToSplit: (
    planId: string,
    day?: Partial<SplitPlanDay>,
    dayIndex?: number
  ) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];

        const newDay: SplitPlanDay = {
          workouts: day?.workouts || [],
          isRest: day?.isRest ?? false,
          notes: day?.notes || "",
        };

        if (dayIndex === undefined || dayIndex < 0 || dayIndex > split.length) {
          // append at the end
          split.push(newDay);
        } else {
          // insert at specified index
          split.splice(dayIndex, 0, newDay);
        }

        // Recalculate lengths
        const splitLength = split.length;
        const activeLength = split.filter((d) => !d.isRest).length;

        return {
          ...p,
          split,
          splitLength,
          activeLength,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  removeDayFromSplit: (planId: string, dayIndex: number) => {
    set((state) => ({
      splitPlans: state.splitPlans.map((p) => {
        if (p.id !== planId) return p;
        const split = [...p.split];
        if (dayIndex < 0 || dayIndex >= split.length) return p; // out of bounds guard
        split.splice(dayIndex, 1);

        // Recalculate lengths
        const splitLength = split.length;
        const activeLength = split.filter((d) => !d.isRest).length;

        return {
          ...p,
          split,
          splitLength,
          activeLength,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  getSplitById: (planId) => {
    const { splitPlans } = get();
    return splitPlans.find((p) => p.id === planId);
  },
});
