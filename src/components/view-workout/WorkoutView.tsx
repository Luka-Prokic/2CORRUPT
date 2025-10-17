import { useWorkoutStore } from "../../stores/workoutStore";
import { ExerciseListView } from "./ExerciseListView";
import { NoExerciseView } from "./NoExerciseView";
import { UIView } from "../ui/UIView";

export function WorkoutView() {
  const { activeExercise } = useWorkoutStore();

  const content = activeExercise ? <ExerciseListView /> : <NoExerciseView />;

  return <UIView type="workout">{content}</UIView>;
}
