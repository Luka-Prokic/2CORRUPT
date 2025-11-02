import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { router } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout";
import { useTranslation } from "react-i18next";

export function CreateSplitButton() {
  const { theme } = useSettingsStore();
  const { createSplitPlan } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    const splitId = createSplitPlan();
    router.push({
      pathname: "/splits/[splitId]",
      params: { splitId },
    });
  }
  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("button.create")}
      </Text>
    </TouchableOpacity>
  );
}
