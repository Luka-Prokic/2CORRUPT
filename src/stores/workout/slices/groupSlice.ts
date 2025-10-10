import { StateCreator } from "zustand";
import { WorkoutStore, GroupSlice, SessionExercise } from "../types";
import { nanoid } from "nanoid/non-secure";

export const createGroupSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  GroupSlice
> = (set, get) => ({
  /**
   * Add a new group (superset or circuit) to the active session
   */
  addGroupToSession: (type, exercises, options) => {},

  /**
   * Remove an existing group (superset or circuit) from the active session
   */
  removeGroupFromSession: (groupId) => {},

  /**
   * Update group properties — name, exercises, or rounds
   */
  updateGroupInSession: (groupId, updates) => {},
});
