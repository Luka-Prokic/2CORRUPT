import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function CreateNewExerciseButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => {}} style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("add-exercise.create")}
      </Text>
    </TouchableOpacity>
  );
}
