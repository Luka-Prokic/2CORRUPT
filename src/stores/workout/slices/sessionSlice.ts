import { StateCreator } from "zustand";
import { WorkoutStore, WorkoutSession, WorkoutSet, DropSet } from "../types";

/**
 * Session slice: manages active workout sessions and set logging
 */
export const createSessionSlice: StateCreator<WorkoutStore, [], [], any> = (set, get) => ({
  activeSession: null,
  isWorkoutActive: false,
  completedSessions: [],

  startSession: (templateId: any) => {
    const { templates } = get();
    const template = templateId ? templates.find((t: any) => t.id === templateId) : null;

    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      templateId: templateId || null,
      templateVersion: template?.version || null,
      name: template?.name || "Custom Workout",
      startTime: new Date().toISOString(),
      isActive: true,
      items: template ? template.layout.map((layoutItem: any) => {
        // Deep copy layout items to session items
        if (layoutItem.type === "exercise") {
          return {
            type: "exercise",
            id: layoutItem.id,
            exercise: {
              id: layoutItem.id,
              exerciseInfoId: layoutItem.id,
              name: layoutItem.name || "Unknown Exercise",
              primaryMuscles: [],
              secondaryMuscles: [],
              equipment: [],
              sets: [], // Start with empty sets
            }
          };
        } else if (layoutItem.type === "superset") {
          return {
            type: "superset",
            id: layoutItem.id,
            name: layoutItem.name,
            exercises: layoutItem.exerciseIds.map((exerciseId: any) => ({
              id: exerciseId,
              exerciseInfoId: exerciseId,
              name: "Unknown Exercise",
              primaryMuscles: [],
              secondaryMuscles: [],
              equipment: [],
              sets: [], // Start with empty sets
            }))
          };
        } else { // circuit
          return {
            type: "circuit",
            id: layoutItem.id,
            exercises: layoutItem.exerciseIds.map((exerciseId: any) => ({
              id: exerciseId,
              exerciseInfoId: exerciseId,
              name: "Unknown Exercise",
              primaryMuscles: [],
              secondaryMuscles: [],
              equipment: [],
              sets: [], // Start with empty sets
            })),
            rounds: layoutItem.rounds || 1
          };
        }
      }) : [],
      createdAt: new Date().toISOString(),
    };

    set({
      activeSession: newSession,
      isWorkoutActive: true,
    });
  },

  completeSession: () => {
    const { activeSession } = get();
    if (activeSession) {
      const endTime = new Date().toISOString();
      const startTime = new Date(activeSession.startTime);
      const durationSeconds = Math.floor((new Date(endTime).getTime() - startTime.getTime()) / 1000);

      // Calculate totals from all sets in all exercises
      let totalSets = 0;
      let totalReps = 0;
      let totalVolumeKg = 0;

      activeSession.items.forEach((item: any) => {
        if (item.type === "exercise") {
          item.exercise.sets.forEach((set: WorkoutSet) => {
            if (set.isCompleted) {
              totalSets++;
              totalReps += set.reps || 0;
              totalVolumeKg += ((set.weight || 0) * (set.reps || 0));
              
              // Add drop sets
              if (set.dropSets) {
                set.dropSets.forEach((dropSet: DropSet) => {
                  totalSets++;
                  totalReps += dropSet.reps || 0;
                  totalVolumeKg += ((dropSet.weight || 0) * (dropSet.reps || 0));
                });
              }
            }
          });
        } else if (item.type === "superset" || item.type === "circuit") {
          item.exercises.forEach((exercise: any) => {
            exercise.sets.forEach((set: WorkoutSet) => {
              if (set.isCompleted) {
                totalSets++;
                totalReps += set.reps || 0;
                totalVolumeKg += ((set.weight || 0) * (set.reps || 0));
                
                // Add drop sets
                if (set.dropSets) {
                  set.dropSets.forEach((dropSet: DropSet) => {
                    totalSets++;
                    totalReps += dropSet.reps || 0;
                    totalVolumeKg += ((dropSet.weight || 0) * (dropSet.reps || 0));
                  });
                }
              }
            });
          });
        }
      });

      const completedSession: WorkoutSession = {
        ...activeSession,
        endTime,
        isActive: false,
        totals: {
          totalSets,
          totalReps,
          totalVolumeKg,
          durationSeconds,
        },
        updatedAt: endTime,
      };

      set((state: any) => ({
        activeSession: null,
        isWorkoutActive: false,
        completedSessions: [...state.completedSessions, completedSession],
      }));
    }
  },

  logSet: (layoutItemId: any, reps: any, weight: any, rpe?: any, notes?: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      reps,
      weight,
      rpe,
      notes,
      isCompleted: true,
      dropSets: [],
    };

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.id === layoutItemId && item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: [...item.exercise.sets, newSet],
              },
            };
          }
          return item;
        }),
      },
    }));
  },

  updateSet: (setId: any, updates: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId ? { ...set, ...updates } : set
                ),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => ({
                ...exercise,
                sets: exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId ? { ...set, ...updates } : set
                ),
              })),
            };
          }
          return item;
        }),
      },
    }));
  },

  deleteSet: (setId: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.filter((set: WorkoutSet) => set.id !== setId),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => ({
                ...exercise,
                sets: exercise.sets.filter((set: WorkoutSet) => set.id !== setId),
              })),
            };
          }
          return item;
        }),
      },
    }));
  },

  addDropSet: (setId: any, reps: any, weight: any, notes?: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const newDropSet: DropSet = {
      id: Date.now().toString(),
      reps,
      weight,
      notes,
    };

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { ...set, dropSets: [...(set.dropSets || []), newDropSet] }
                    : set
                ),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => ({
                ...exercise,
                sets: exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { ...set, dropSets: [...(set.dropSets || []), newDropSet] }
                    : set
                ),
              })),
            };
          }
          return item;
        }),
      },
    }));
  },

  updateDropSet: (setId: any, dropSetId: any, updates: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { 
                        ...set, 
                        dropSets: set.dropSets?.map((dropSet: DropSet) =>
                          dropSet.id === dropSetId ? { ...dropSet, ...updates } : dropSet
                        )
                      }
                    : set
                ),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => ({
                ...exercise,
                sets: exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { 
                        ...set, 
                        dropSets: set.dropSets?.map((dropSet: DropSet) =>
                          dropSet.id === dropSetId ? { ...dropSet, ...updates } : dropSet
                        )
                      }
                    : set
                ),
              })),
            };
          }
          return item;
        }),
      },
    }));
  },

  deleteDropSet: (setId: any, dropSetId: any) => {
    const { activeSession } = get();
    if (!activeSession) return;

    set((state: any) => ({
      activeSession: {
        ...state.activeSession,
        items: state.activeSession.items.map((item: any) => {
          if (item.type === "exercise") {
            return {
              ...item,
              exercise: {
                ...item.exercise,
                sets: item.exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { 
                        ...set, 
                        dropSets: set.dropSets?.filter((dropSet: DropSet) => dropSet.id !== dropSetId)
                      }
                    : set
                ),
              },
            };
          } else if (item.type === "superset" || item.type === "circuit") {
            return {
              ...item,
              exercises: item.exercises.map((exercise: any) => ({
                ...exercise,
                sets: exercise.sets.map((set: WorkoutSet) =>
                  set.id === setId 
                    ? { 
                        ...set, 
                        dropSets: set.dropSets?.filter((dropSet: DropSet) => dropSet.id !== dropSetId)
                      }
                    : set
                ),
              })),
            };
          }
          return item;
        }),
      },
    }));
  },

  resetSession: () => {
    set({ activeSession: null, isWorkoutActive: false });
  },
});