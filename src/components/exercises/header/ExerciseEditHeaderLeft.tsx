import { router } from "expo-router";
import { TextButton } from "../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";

export function ExerciseEditHeaderLeft() {
  const { t } = useTranslation();
  const { clearDraftExercise } = useWorkoutStore();
  const { theme } = useSettingsStore();

  function handlePress() {
    clearDraftExercise();
    router.back();
  }

  return (
    <TextButton
      text={t("button.cancel")}
      onPress={handlePress}
      color={theme.error}
    />
  );
}
