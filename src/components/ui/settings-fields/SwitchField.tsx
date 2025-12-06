import { IBubble } from "../containers/IBubble";
import { MidText } from "../text/MidText";
import { DescriptionText } from "../text/DescriptionText";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SwitchButton } from "../buttons/SwitchButton";
import { SwitchSettingConfig } from "../../../config/settings/types";
import { useTranslation } from "react-i18next";

interface SwitchFieldProps {
  setting: SwitchSettingConfig;
}

export function SwitchField({ setting }: SwitchFieldProps) {
  const settingsState = useSettingsStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const value = setting.select(settingsState);

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <SwitchButton
        option1={t(`settings.options.${setting.options[0].toLowerCase()}`)}
        option2={t(`settings.options.${setting.options[1].toLowerCase()}`)}
        value={t(`settings.options.${value.toLowerCase()}`)}
        onChange={(newValue: (typeof setting.options)[number]) =>
          setting.update(settingsState, newValue)
        }
        haptics
      />
      {setting.description && (
        <DescriptionText
          text={t(setting.description)}
          style={{ color: theme.grayText }}
        />
      )}
    </IBubble>
  );
}
