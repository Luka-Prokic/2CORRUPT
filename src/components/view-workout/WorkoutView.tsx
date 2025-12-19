import { useWorkoutStore } from "../../stores/workoutStore";
import { ExerciseListView } from "./ExerciseListView";
import { NoExerciseView } from "./NoExerciseView";
import { UIView } from "../ui/UIView";

export function WorkoutView() {
  const { activeExercise, activeSession } = useWorkoutStore();

  const content =
    activeSession && activeExercise ? <ExerciseListView /> : <NoExerciseView />;

  return <UIView type="workout">{content}</UIView>;
}
