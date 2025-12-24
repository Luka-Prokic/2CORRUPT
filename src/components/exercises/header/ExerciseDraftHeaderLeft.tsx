import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Text, TouchableOpacity } from "react-native";

export function ExerciseDraftHeaderLeft() {
  const { t } = useTranslation();
  const { clearDraftExercise } = useWorkoutStore();
  const { theme } = useSettingsStore();

  function handlePress() {
    clearDraftExercise();
    router.back();
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, color: theme.error }}>
        {t("button.cancel")}
      </Text>
    </TouchableOpacity>
  );
}
