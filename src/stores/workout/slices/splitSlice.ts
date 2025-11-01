import { StateCreator } from "zustand";
import { nanoid } from "nanoid";
import {
  WorkoutStore,
  SplitPlanSlice,
  SplitPlan,
  SplitPlanHistoryEntry,
} from "../types";

export const createSplitPlanSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  SplitPlanSlice
> = (set, get) => ({
  splitPlans: [],
  activeSplitPlan: null,
  historySplitPlan: [],

  createSplitPlan: (plan?: Partial<SplitPlan>) => {
    const { splitPlans } = get();
    const id = nanoid();
    const newPlan: SplitPlan = {
      id,
      name: plan?.name || "New Split Plan",
      split: plan?.split || [],
      description: plan?.description,
      metadata: plan?.metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set({ splitPlans: [...splitPlans, newPlan] });
    return id;
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
      splitPlans: state.splitPlans.map((p) =>
        p.id === planId
          ? { ...p, [field]: value, updatedAt: new Date().toISOString() }
          : p
      ),
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
        return { ...p, split, updatedAt: new Date().toISOString() };
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
        return { ...p, split, updatedAt: new Date().toISOString() };
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
        return { ...p, split, updatedAt: new Date().toISOString() };
      }),
    }));
  },

  setActiveSplitPlan: (plan: SplitPlan) => {
    const now = new Date().toISOString();
    const state = get();

    // End previous active split, if any
    if (state.activeSplitPlan) {
      const updatedHistory = state.historySplitPlan.map((h) =>
        !h.endTime ? { ...h, endTime: now } : h
      );
      set({ historySplitPlan: updatedHistory });
    }

    // Add new history entry as snapshot
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
});
