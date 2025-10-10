import { ExerciseInfo, SessionExercise } from "../../stores/workout/types";
import { EmptySet } from "../../config/constants/defaults";

export function createSessionExercise(exercise: ExerciseInfo): SessionExercise {
  return {
    id: `${exercise.id}-${Date.now().toString()}-${Math.random().toString(36)}`,
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
    inSuperSet: false,
  };
}
