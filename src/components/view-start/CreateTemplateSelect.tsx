import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../features/Dimensions";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";

export function CreateTemplateSelect() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();

  function handlePress() {
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <IButton
      onPress={handlePress}
      color={theme.primaryBackground}
      style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
    >
      <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
        {t("workout-view.create-template")}
      </Text>
    </IButton>
  );
}
