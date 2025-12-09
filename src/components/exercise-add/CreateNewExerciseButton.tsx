import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout";
import { router } from "expo-router";

export function CreateNewExerciseButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { startDraftExercise } = useWorkoutStore();

  function handlePress() {
    startDraftExercise(null);
    router.replace({
      pathname: "/exercise/[exerciseId]/create",
      params: { exerciseId: "new" },
    });
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("add-exercise.create")}
      </Text>
    </TouchableOpacity>
  );
}
