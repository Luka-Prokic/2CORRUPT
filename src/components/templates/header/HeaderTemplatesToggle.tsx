import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../stores/settings";
import { IButton } from "../../ui/buttons/IButton";

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
      title={mode ? t("button.cancel") : t("button.select")}
      onPress={toggleMode}
      style={{
        paddingHorizontal: 8,
        height: 24,
        borderRadius: 17,
      }}
      color={theme.info}
      textColor={theme.secondaryText}
    />
  );
}
