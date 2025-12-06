import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { useEditTemplate } from "../../../features/start/useEditTemplate";

export function CreateTemplateButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={useEditTemplate()} style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("button.create")}
      </Text>
    </TouchableOpacity>
  );
}
