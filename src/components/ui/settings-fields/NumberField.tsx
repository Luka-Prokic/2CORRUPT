import { NumberSettingConfig } from "../../../config/settings/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface NumberFieldProps {
  setting: NumberSettingConfig;
}

export function NumberField({ setting }: NumberFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <DescriptionText
        text={t(setting.description)}
        style={{ color: theme.grayText }}
      />
      {/* Here you can add a slider, stepper, or input if you want editable number */}
    </IBubble>
  );
}
