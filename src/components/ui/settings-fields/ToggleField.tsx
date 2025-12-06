import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { SwitchButton } from "../../ui/buttons/SwitchButton";
import { ToggleSettingConfig } from "../../../config/settings/types";

interface ToggleFieldProps {
  setting: ToggleSettingConfig;
}

export function ToggleField({ setting }: ToggleFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <SwitchButton
        option1={t("button.on")}
        option2={t("button.off")}
        value={value ? t("button.on") : t("button.off")}
        onChange={() => setting.update(settingsState, !value)}
        haptics
      />
      {setting.description && (
        <DescriptionText text={t(setting.description)} style={{ color: theme.grayText }} />
      )}
    </IBubble>
  );
}
