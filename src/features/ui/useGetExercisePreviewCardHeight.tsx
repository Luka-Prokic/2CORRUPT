import { SessionExercise } from "../../stores/workout";

const EXERCISE_NAME_HEIGHT = 64;
const SET_HEIGHT = 54;
const DROPSET_HEIGHT = 34;
const NOTES_HEIGHT = 64;

export function useLayoutPreviewHeight(layout: SessionExercise[]) {
  let maxHeight = 0;

  layout.forEach((exercise) => {
    let exerciseHeight = EXERCISE_NAME_HEIGHT;

    // sets
    exercise.sets.forEach((set) => {
      exerciseHeight += SET_HEIGHT;
      if (set.dropSets?.length) {
        exerciseHeight += set.dropSets.length * DROPSET_HEIGHT;
      }
    });

    // notes
    if (exercise.notes) {
      exerciseHeight += NOTES_HEIGHT;
    }

    // update max height if this exercise is taller
    if (exerciseHeight > maxHeight) {
      maxHeight = exerciseHeight;
    }
  });

  return maxHeight;
}

export function useExercisePreviewHeight(exercise: SessionExercise) {
  let totalHeight = 0;

  totalHeight += EXERCISE_NAME_HEIGHT; // exercise name

  exercise.sets.forEach((set) => {
    totalHeight += SET_HEIGHT;
    if (set.dropSets?.length) {
      totalHeight += set.dropSets.length * DROPSET_HEIGHT;
    }
  });

  if (exercise.notes) {
    totalHeight += NOTES_HEIGHT;
  }

  return totalHeight;
}
