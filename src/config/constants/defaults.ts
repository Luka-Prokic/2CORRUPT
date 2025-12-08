import { nanoid } from "nanoid/non-secure";
import { Set } from "../../stores/workout/types";

export const username = "Pencil Neck";

export const EmptySet: Set = {
  id: `set-${nanoid()}`,
  reps: null,
  weight: null,
  dropSets: [],
  rir: null,
  rpe: null,
  isCompleted: false,
};
