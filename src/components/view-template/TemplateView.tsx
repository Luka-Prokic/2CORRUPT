import { CreateTemplateView } from "./CreateTemplateView";
import { UIView } from "../ui/UIView";
import { useWorkoutStore } from "../../stores/workout";
import { ExerciseListView } from "../view-workout/ExerciseListView";

export function TemplateView() {
  const { activeExercise } = useWorkoutStore();

  const content = activeExercise ? (
    <ExerciseListView />
  ) : (
    <CreateTemplateView />
  );
  return <UIView type="template">{content}</UIView>;
}
