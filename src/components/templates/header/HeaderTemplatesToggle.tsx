import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../stores/settings";
import { IButton } from "../../ui/buttons/IButton";
import { IText } from "../../ui/text/IText";
interface HeaderTemplatesToggleProps {
  mode: boolean;
  toggleMode: () => void;
}

export function HeaderTemplatesToggle({
  mode = false,
  toggleMode,
}: HeaderTemplatesToggleProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  return (
    <IButton
      onPress={toggleMode}
      style={{
        paddingHorizontal: 8,
        height: 24,
        borderRadius: 17,
      }}
      color={theme.info}
    >
      <IText
        text={mode ? t("button.cancel") : t("button.select")}
        size={16}
        color={theme.secondaryText}
      />
    </IButton>
  );
}
