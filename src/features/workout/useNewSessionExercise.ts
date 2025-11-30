import {
  ExerciseColumns,
  ExerciseInfo,
  SessionExercise,
} from "../../stores/workout/types";
import { EmptySet } from "../../config/constants/defaults";
import { nanoid } from "nanoid/non-secure";
import { useSettingsStore } from "../../stores/settingsStore";

export function createSessionExercise(exercise: ExerciseInfo): SessionExercise {
  const settingsStore = useSettingsStore.getState();
  const { startRestTimer, showRIR, showRPE, defaultRestTime } = settingsStore;

  const columns: ExerciseColumns[] = exercise.equipment?.includes("bodyweight")
    ? ["Reps"]
    : ["Reps", "Weight"];
  if (showRIR) columns.push("RIR");
  if (showRPE) columns.push("RPE");

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
    columns,
    restTime: defaultRestTime,
    noRest: !startRestTimer,
  };
}
