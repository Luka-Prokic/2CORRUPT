import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useActionSheet } from "../../../features/useActionSheet";

export function RemoveExerciseButton() {
  const { theme } = useSettingsStore();
  const { activeExercise, removeExercisesFromSession } = useWorkoutStore();
  const { showActionSheet, t } = useActionSheet();

  function handleRemoveExercise() {
    const title = t("workout-board.delete") + ` ${activeExercise?.name}`;
    const message = t("workout-board.delete-exercise-message");

    showActionSheet({
      title: `${title}?`,
      message,
      options: [t("workout-board.cancel"), t("workout-board.delete")],
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (index) => {
        if (index === 1) removeExercisesFromSession([activeExercise?.id]);
      },
    });
  }

  return (
    <OptionButton
      title="Remove Exercise"
      icon={<Ionicons name="remove-circle-outline" size={24} color={theme.error} />}
      height={44}
      onPress={handleRemoveExercise}
      color={theme.error}
    />
  );
}
