import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWorkoutStore } from "../../../stores/workout";
import { useTranslation } from "react-i18next";

export function CreateTemplateButton() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("button.create")}
      </Text>
    </TouchableOpacity>
  );
}
