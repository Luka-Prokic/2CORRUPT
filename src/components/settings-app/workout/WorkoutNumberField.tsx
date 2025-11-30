import { WorkoutSettingConfig } from "../../../config/settings/workoutSettings";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface WorkoutSettingsNumberFieldProps {
  setting: WorkoutSettingConfig;
}

export function WorkoutSettingsNumberField({
  setting,
}: WorkoutSettingsNumberFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  if (setting.type !== "number") return null;

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <DescriptionText
        text={t(setting.description)}
        style={{
          color: theme.grayText,
        }}
      />
    </IBubble>
  );
}
