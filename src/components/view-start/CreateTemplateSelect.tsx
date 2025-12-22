import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../utils/Dimensions";
import { useTranslation } from "react-i18next";
import { useEditTemplate } from "../../features/start/useEditTemplate";
import { IText } from "../ui/text/IText";

export function CreateTemplateSelect() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const createTemplate = useEditTemplate();

  return (
    <IButton
      onPress={createTemplate}
      color={theme.tint}
      style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
    >
      <IText
        text={t("workout-view.create-template")}
        color={theme.border}
        size={36}
      />
    </IButton>
  );
}
