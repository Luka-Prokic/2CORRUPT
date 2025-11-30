import { WorkoutSettingConfig } from "../../../config/settings/workoutSettings";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { SwitchButton } from "../../ui/buttons/SwitchButton";

interface WorkoutSettingsFieldProps {
  setting: WorkoutSettingConfig;
}

export function WorkoutSettingsField({ setting }: WorkoutSettingsFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  if (setting.type !== "toggle") return null;

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <SwitchButton
        option1={t(`button.on`)}
        option2={t(`button.off`)}
        value={value ? t(`button.on`) : t(`button.off`)}
        onChange={() => setting.update(settingsState, !value)}
        haptics
      />
      <DescriptionText
        text={t(setting.description)}
        style={{
          color: theme.grayText,
        }}
      />
    </IBubble>
  );
}
