import { router } from "expo-router";
import { TextButton } from "../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";

export function ExerciseEditHeaderRight() {
  const { t } = useTranslation();
  const { updateExerciseWithDraft } = useWorkoutStore();
  const { theme } = useSettingsStore();

  function handlePress() {
    updateExerciseWithDraft();
    router.dismissTo({
      pathname: "/exercise/list",
    });
  }

  return (
    <TextButton
      text={t("button.done")}
      onPress={handlePress}
      color={theme.accent}
    />
  );
}
