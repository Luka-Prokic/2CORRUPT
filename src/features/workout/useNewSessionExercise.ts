import { ExerciseInfo, SessionExercise } from "../../stores/workout/types";
import { EmptySet } from "../../config/constants/defaults";
import { nanoid } from "nanoid/non-secure";

export function createSessionExercise(exercise: ExerciseInfo): SessionExercise {
  return {
    id: `${exercise.id}-${nanoid()}`,
    exerciseInfoId: exercise.id,
    name: exercise.defaultName,
    prefix: undefined,
    primaryMuscles: [...exercise.primaryMuscles],
    secondaryMuscles: exercise.secondaryMuscles
      ? [...exercise.secondaryMuscles]
      : undefined,
    equipment: exercise.equipment ? [...exercise.equipment] : undefined,
    notes: null,
    sets: [EmptySet],
  };
}

export function createGroupSessionExercise(
  exercise: ExerciseInfo,
  inSuperSet = true
): SessionExercise {
  return {
    id: `${exercise.id}-${nanoid()}`,
    exerciseInfoId: exercise.id,
    name: exercise.defaultName,
    prefix: undefined,
    primaryMuscles: [...exercise.primaryMuscles],
    secondaryMuscles: exercise.secondaryMuscles
      ? [...exercise.secondaryMuscles]
      : undefined,
    equipment: exercise.equipment ? [...exercise.equipment] : undefined,
    notes: null,
    sets: [EmptySet],
    group: {
      id: `${exercise.id}-${nanoid()}`,
      type: inSuperSet ? "superset" : "circuit",
      name: inSuperSet ? "Superset" : "Circuit",
    },
  };
}
