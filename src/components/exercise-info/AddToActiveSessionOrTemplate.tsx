import { router } from "expo-router";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useUIStore } from "../../stores/uiStore";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { createSessionExercise } from "../../features/workout/useNewSessionExercise";
import { ExerciseInfo } from "../../stores/workout/types";

interface AddToActiveSessionOrTemplateProps {
  exercise: ExerciseInfo;
}

export function AddToActiveSessionOrTemplate({
  exercise,
}: AddToActiveSessionOrTemplateProps) {
  const {
    activeSession,
    activeTemplate,
    addExerciseToSession,
    addExerciseToTemplate,
  } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const { theme } = useSettingsStore();

  function handlePress() {
    if (activeSession) {
      setTypeOfView("workout");
      addExerciseToSession(createSessionExercise(exercise));
    }
    if (activeTemplate) {
      setTypeOfView("template");
      addExerciseToTemplate(createSessionExercise(exercise));
    }
    setTimeout(() => {
      router.dismissTo("/");
    }, 100);
  }
  return (
    <StrobeOptionButton
      title={activeSession ? "Add to session" : "Add to template"}
      icon={
        <Ionicons
          name="add"
          size={24}
          color={activeSession ? theme.accent : theme.tint}
        />
      }
      color={activeSession ? theme.accent : theme.tint}
      onPress={handlePress}
      justifyContent="space-between"
      disabled={!activeSession && !activeTemplate}
    />
  );
}
