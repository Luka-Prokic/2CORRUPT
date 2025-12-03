import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { useActionSheet } from "../../../utils/useActionSheet";
import { StrobeOptionButton } from "../../ui/buttons/StrobeOptionButton";
import { WIDTH } from "../../../utils/Dimensions";

export function RemoveExerciseButton() {
  const { theme } = useSettingsStore();
  const {
    activeExercise,
    removeExercisesFromSession,
    removeExercisesFromTemplate,
    activeTemplate,
  } = useWorkoutStore();
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
        if (index === 1) removeExercise();
      },
    });
  }

  function removeExercise() {
    removeExercisesFromSession([activeExercise?.id]);
    removeExercisesFromTemplate([activeExercise?.id]);
  }

  const error = activeTemplate ? theme.tint : theme.error;

  return (
    <StrobeOptionButton
      title={t("workout-board.remove-exercise")}
      icon={<Ionicons name="remove-circle" size={24} color={error} />}
      height={44}
      width={WIDTH}
      onPress={handleRemoveExercise}
      color={error}
      strobeDisabled
      justifyContent="space-between"
    />
  );
}
