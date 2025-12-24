import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useIsExerciseInfoComplete } from "../../../features/workout/useIsExerciseInfoComplete";
import { Text, TouchableOpacity } from "react-native";

export function ExerciseCreateHeaderRight() {
  const { t } = useTranslation();
  const { saveDraftExercise, draftExercise } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const isComplete = useIsExerciseInfoComplete(draftExercise);

  function handlePress() {
    saveDraftExercise();
    router.dismissTo({
      pathname: "/exercise/list",
    });
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ padding: 8, opacity: !isComplete ? 0.2 : 1 }}
      disabled={!isComplete}
    >
      <Text style={{ fontSize: 16, color: theme.accent }}>
        {t("button.done")}
      </Text>
    </TouchableOpacity>
  );
}
