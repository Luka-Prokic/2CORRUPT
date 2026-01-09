import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { useEditTemplate } from "../../../features/start/useEditTemplate";
import { useWorkoutStore } from "../../../stores/workout";

export function CreateTemplateButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSession } = useWorkoutStore();
  const createTemplate = useEditTemplate();

  return (
    <TouchableOpacity
      onPress={createTemplate}
      style={{ padding: 8, opacity: !!activeSession ? 0.4 : 1 }}
      disabled={!!activeSession}
    >
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("button.create")}
      </Text>
    </TouchableOpacity>
  );
}
