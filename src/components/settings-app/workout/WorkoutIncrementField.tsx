import { WorkoutSettingConfig } from "../../../config/settings/workoutSettings";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { IText } from "../../ui/text/IText";
import { WIDTH } from "../../../utils/Dimensions";
import { useFormatTime } from "../../../features/format/useFormatTime";

interface WorkoutSettingsIncrementFieldProps {
  setting: WorkoutSettingConfig;
}

export function WorkoutSettingsIncrementField({
  setting,
}: WorkoutSettingsIncrementFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  if (setting.type !== "increment") return null;

  const value = setting.select(settingsState);

  const shownValue =
    setting.key === "defaultRestTime"
      ? useFormatTime({ seconds: value, format: "auto+" })
      : value.toString();

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <IText text={shownValue} size={52} />
      <TwoOptionStrobeButtons
        labelOne={`-${setting.increment}`}
        labelTwo={`+${setting.increment}`}
        onOptionOne={() =>
          setting.update(settingsState, value - setting.increment)
        }
        onOptionTwo={() =>
          setting.update(settingsState, value + setting.increment)
        }
        width={WIDTH - 64}
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
