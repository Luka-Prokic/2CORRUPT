import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../utils/Dimensions";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { IText } from "../ui/text/IText";

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
      color={theme.handle}
      style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
    >
      <IText text={t("workout-view.create-template")} color={theme.info} />
    </IButton>
  );
}
