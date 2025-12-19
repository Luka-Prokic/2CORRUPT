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
import { useUserStore } from "../../user/useUserStore";
import { useSettingsStore } from "../../settings/useSettingsStore";

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
> = (set, get) => {
  // ----------------- Helper -----------------
  function syncActiveSplit(
    state: WorkoutStore,
    updatedPlan: SplitPlan
  ): WorkoutStore {
    const { activeSplitPlan, historySplitPlan } = state;
    if (!activeSplitPlan) return state;

    // Only sync if same plan
    if (activeSplitPlan.plan.id !== updatedPlan.id) return state;

    const now = new Date().toISOString();
    const today = new Date().toDateString();

    // 🧩 If the plan no longer has any days → deactivate it
    if (updatedPlan.splitLength === 0) {
      const updatedHistory = state.historySplitPlan.map((h) =>
        !h.endTime ? { ...h, endTime: now } : h
      );
      const noSplitHistoryEntry: SplitPlanHistoryEntry = {
        id: `no-split-history-${Date.now()}`,
        plan: NoSplit,
        startTime: now,
        startDay: 0,
      };
      return {
        ...state,
        activeSplitPlan: { plan: NoSplit, startDay: 0, startTime: now },
        historySplitPlan: [...updatedHistory, noSplitHistoryEntry],
      };
    }

    // Clamp startDay to stay within range of new plan
    const maxStartDay = Math.max(0, updatedPlan.split.length - 1);
    const clampedStartDay = Math.min(activeSplitPlan.startDay, maxStartDay);

    // Deep copy for snapshot consistency
    const planSnapshot = JSON.parse(JSON.stringify(updatedPlan));

    // End all unfinished history entries first
    const endedHistory = historySplitPlan.map((h) =>
      !h.endTime ? { ...h, endTime: now } : h
    );

    // Filter out same-day duplicates for the same plan
    const filteredHistory = endedHistory.filter((h) => {
      const entryDate = new Date(h.startTime).toDateString();
      return !(entryDate === today && h.plan.id === updatedPlan.id);
    });

    // Create updated active snapshot
    const newActive: ActiveSplitPlanState = {
      plan: planSnapshot,
      startDay: clampedStartDay,
      startTime: now,
    };

    // Add new history snapshot entry
    const newHistoryEntry: SplitPlanHistoryEntry = {
      id: nanoid(),
      plan: planSnapshot,
      startDay: clampedStartDay,
      startTime: now,
    };

    return {
      ...state,
      activeSplitPlan: newActive,
      historySplitPlan: [...filteredHistory, newHistoryEntry],
    };
  }

  // ----------------- Slice -----------------
  return {
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
      const user = useUserStore.getState().user;
      const newSplit: SplitPlanDay[] = (plan?.split || []).map((d) => ({
        id: `split-day-${nanoid()}`,
        workouts: (d?.workouts || []) as SplitPlanWorkout[],
        isRest: d?.isRest ?? false,
      }));

      const splitLength = newSplit.length;
      const activeLength = newSplit.filter((d) => !d.isRest).length;

      const newPlan: SplitPlan = {
        id: `split-${nanoid()}`,
        name: plan?.name || "New Split",
        split: newSplit,
        userId: user?.id || null,
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
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const updated: SplitPlan = {
            ...p,
            [field]: value,
            updatedAt: new Date().toISOString(),
          };
          updated.activeLength = updated.split.filter((d) => !d.isRest).length;
          updated.splitLength = updated.split.length;
          return updated;
        });

        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    deleteSplitPlan: (planId: string) => {
      set((state) => {
        const splitPlans = state.splitPlans.filter((p) => p.id !== planId);
        let newState = {
          ...state,
          splitPlans,
        };
        if (state.activeSplitPlan?.plan.id === planId) {
          newState.activeSplitPlan = {
            plan: NoSplit,
            startDay: 0,
            startTime: new Date().toISOString(),
          };
        }
        return newState;
      });
    },

    // ----------------- Workout / Day Management -----------------
    addWorkoutToDay: (planId, dayIndex, templateId) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
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
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    removeWorkoutFromDay: (planId, dayIndex, workoutId) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          if (!split[dayIndex]) return p;
          split[dayIndex] = {
            ...split[dayIndex],
            workouts: split[dayIndex].workouts.filter(
              (w) => w.id !== workoutId
            ),
          };
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    updateWorkoutInDay: (planId, dayIndex, workoutId, updates) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
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
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    swapWorkoutTemplate: (planId, dayIndex, workoutId, newTemplateId) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          if (!split[dayIndex]) return p;
          const workouts = [...split[dayIndex].workouts];
          const idx = workouts.findIndex((w) => w.id === workoutId);
          if (idx === -1) return p;
          workouts[idx] = createSplitPlanWorkout(newTemplateId);
          split[dayIndex] = { ...split[dayIndex], workouts };
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    reorderWorkoutsInDay: (planId, dayIndex, newOrder) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
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
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    reorderWorkoutsInDayAuto: (planId, dayIndex) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;

          const split = [...p.split];
          if (!split[dayIndex]) return p;

          const workouts = split[dayIndex].workouts;

          // Sorting logic:
          // 1. Extract HH:MM:SS from scheduledAt if available
          // 2. Sort by time-of-day only
          // 3. Workouts WITHOUT scheduledAt go to end
          const sorted = [...workouts].sort((a, b) => {
            const ta = a.scheduledAt ? new Date(a.scheduledAt) : null;
            const tb = b.scheduledAt ? new Date(b.scheduledAt) : null;

            // If both missing → keep relative order (stable)
            if (!ta && !tb) return 0;
            // Only a missing → a goes last
            if (!ta) return 1;
            // Only b missing → b goes last
            if (!tb) return -1;

            // Compare ONLY time-of-day (ignore date)
            const ma = ta.getHours() * 60 + ta.getMinutes();
            const mb = tb.getHours() * 60 + tb.getMinutes();
            return ma - mb;
          });

          split[dayIndex] = {
            ...split[dayIndex],
            workouts: sorted,
          };

          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };

          return updatedPlan;
        });

        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    addDayToSplit: (planId, day, dayIndex) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          const newDay: SplitPlanDay = {
            id: `split-day-${nanoid()}`,
            workouts: day?.workouts || [],
            isRest: day?.isRest ?? false,
          };
          if (dayIndex === undefined || dayIndex < 0 || dayIndex > split.length)
            split.push(newDay);
          else split.splice(dayIndex, 0, newDay);
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    removeDayFromSplit: (planId, dayIndex) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          if (dayIndex < 0 || dayIndex >= split.length) return p;
          split.splice(dayIndex, 1);
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    updateSplitDayField: (planId, dayIndex, field, value) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          if (!split[dayIndex]) return p;
          split[dayIndex] = { ...split[dayIndex], [field]: value };
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    toggleDayRest: (planId, dayIndex) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const split = [...p.split];
          if (!split[dayIndex]) return p;
          split[dayIndex] = {
            ...split[dayIndex],
            isRest: !split[dayIndex].isRest,
          };
          const updatedPlan = {
            ...p,
            split,
            activeLength: split.filter((d) => !d.isRest).length,
            splitLength: split.length,
            updatedAt: new Date().toISOString(),
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    reorderSplitDays: (planId, newOrder: SplitPlanDay[]) => {
      set((state) => {
        const splitPlans = state.splitPlans.map((p) => {
          if (p.id !== planId) return p;
          const updatedPlan = {
            ...p,
            split: newOrder,
            updatedAt: new Date().toISOString(),
            activeLength: newOrder.filter((d) => !d.isRest).length,
            splitLength: newOrder.length,
          };
          return updatedPlan;
        });
        const updatedPlan = splitPlans.find((p) => p.id === planId)!;
        return syncActiveSplit({ ...state, splitPlans }, updatedPlan);
      });
    },

    // ----------------- Active Split -----------------
    setActiveSplitPlan: (plan, startDay = 0, startTime) => {
      const now = startTime || new Date().toISOString();
      const today = new Date().toDateString();
      const state = get();

      const endedHistory = state.historySplitPlan.map((h) =>
        !h.endTime ? { ...h, endTime: now } : h
      );

      const filteredHistory = endedHistory.filter((h) => {
        const entryDate = new Date(h.startTime).toDateString();
        return !(entryDate === today && h.plan.id === plan.id);
      });

      const active: ActiveSplitPlanState = {
        plan: JSON.parse(JSON.stringify(plan)),
        startDay,
        startTime: now,
      };

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

        const updatedActive: ActiveSplitPlanState = {
          ...state.activeSplitPlan,
          startDay: newStartDay,
        };

        const endedHistory = state.historySplitPlan.map((h) =>
          !h.endTime && h.plan.id !== updatedActive.plan.id
            ? { ...h, endTime: now }
            : h
        );

        const filteredHistory = endedHistory.filter((h) => {
          const entryDate = new Date(h.startTime).toDateString();
          return !(entryDate === today && h.plan.id === updatedActive.plan.id);
        });

        const newHistoryEntry: SplitPlanHistoryEntry = {
          id: nanoid(),
          plan: JSON.parse(JSON.stringify(updatedActive.plan)),
          startDay: newStartDay,
          startTime: updatedActive.startTime,
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

    removeTemplateFromSplits: (templateId: string) => {
      const { splitPlans, activeSplitPlan } = get();

      if (!templateId || !splitPlans.length) return;

      const updatedSplitPlans: SplitPlan[] = splitPlans.map(
        (plan: SplitPlan) => ({
          ...plan,
          split: plan.split.map((day: SplitPlanDay) => ({
            ...day,
            workouts: day.workouts.filter(
              (w: SplitPlanWorkout) => w.templateId !== templateId
            ),
          })),
        })
      );
      set({ splitPlans: updatedSplitPlans });

      if (!activeSplitPlan || !updatedSplitPlans.length) return;

      const updatedActivePlan: SplitPlan = updatedSplitPlans.find(
        (p) => p.id === activeSplitPlan.plan.id
      );

      if (!updatedActivePlan) return;

      set((state) => {
        const splitPlans = state.splitPlans.map((p) =>
          p.id === activeSplitPlan.plan.id ? updatedActivePlan : p
        );
        return syncActiveSplit({ ...state, splitPlans }, updatedActivePlan);
      });
    },

    // ----------------- Getters -----------------
    getSplitById: (planId) => get().splitPlans.find((p) => p.id === planId),
    getActiveSplitStartDay: () => get().activeSplitPlan?.startDay ?? null,

    // ----------------- NoSplit -----------------
    updateWeeklyGoal: (newGoal: number) => {
      const { syncWeeklyGoal } = useSettingsStore.getState();
      syncWeeklyGoal?.(newGoal);
      set((state) => {
        // Update NoSplit plan in splitPlans
        const splitPlans = state.splitPlans.map((p) =>
          p.id === "no-split"
            ? {
                ...p,
                activeLength: newGoal, // <-- updated here
                updatedAt: new Date().toISOString(),
              }
            : p
        );

        // Also update activeSplitPlan if it's NoSplit
        const activeSplitPlan =
          state.activeSplitPlan?.plan.id === "no-split"
            ? {
                ...state.activeSplitPlan,
                plan: {
                  ...state.activeSplitPlan.plan,
                  activeLength: newGoal, // <-- updated here
                },
              }
            : state.activeSplitPlan;

        return { ...state, splitPlans, activeSplitPlan };
      });
    },
  };
};
