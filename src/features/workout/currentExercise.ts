import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { SessionExercise } from "../../stores/workout/types";

export function useCurrentExercise() {
  const { activeSession } = useWorkoutStore();
  if (!activeSession) return null;

  const currentExercise = activeSession.layout.find((exercise) =>
    exercise.sets.find((set) => set.isCompleted === false)
  );
  return currentExercise;
}

export function useCurrentSet() {
  const { activeExercise } = useWorkoutStore();
  if (!activeExercise) return null;
  return activeExercise.sets.find((set) => set.isCompleted === false);
}

export function useCurrentSetOfExercise(exercise: SessionExercise) {
  if (!exercise) return null;
  return exercise.sets.find((set) => set.isCompleted === false);
}
