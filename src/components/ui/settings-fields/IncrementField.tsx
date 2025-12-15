import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { WIDTH } from "../../../utils/Dimensions";
import { IncrementSettingConfig } from "../../../config/settings/types";
import { IText } from "../text/IText";
import { useFormatTime } from "../../../features/format/useFormatTime";

interface IncrementFieldProps {
  setting: IncrementSettingConfig;
}

export function IncrementField({ setting }: IncrementFieldProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  const formattedValue =
    setting.key === "defaultRestTime"
      ? useFormatTime({
          seconds: value,
          format: "auto+",
        })
      : value.toString();

  const isDisabledOne = setting.min !== undefined && value <= setting.min;
  const isDisabledTwo = setting.max !== undefined && value >= setting.max;

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <IText text={formattedValue} size={52} />
      <TwoOptionStrobeButtons
        labelOne={`-${setting.increment}`}
        labelTwo={`+${setting.increment}`}
        onOptionOne={() =>
          setting.update(settingsState, value - setting.increment)
        }
        disabledOne={isDisabledOne}
        disabledStrobeOne={isDisabledOne}
        onOptionTwo={() =>
          setting.update(settingsState, value + setting.increment)
        }
        disabledTwo={isDisabledTwo}
        disabledStrobeTwo={isDisabledTwo}
        width={WIDTH - 64}
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
