import { SegmentedSettingConfig } from "../../../config/settings/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { SegmentedButtons } from "../../ui/buttons/SegmentedButtons";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { HapticType, useHapticsIgnore } from "../../../features/ui/useHaptics";

const hapticsMap: Record<string, HapticType | null> = {
  off: null,
  gentle: "soft",
  on: "medium",
  max: "heavy",
};

interface SegmentedFieldProps<T extends string> {
  setting: SegmentedSettingConfig<T>;
}

export function SegmentedField<T extends string>({
  setting,
}: SegmentedFieldProps<T>) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  const value = setting.select(settingsState);

  const isItHaptics = setting.key === "haptics"; //custom use
  const triggerHaptics = useHapticsIgnore();

  function handleChange(newValue: string) {
    const index = setting.options.findIndex(
      (o) => t(`settings.options.${o}`) === newValue
    );
    if (index < 0) return;

    const selectedKey = setting.options[index];
    setting.update(settingsState, selectedKey);

    if (isItHaptics) {
      const hapticType = hapticsMap[selectedKey];
      if (hapticType) triggerHaptics(hapticType);
      console.log(hapticType);
    }
  }

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <SegmentedButtons
        options={setting.options.map((o) => t(`settings.options.${o}`))}
        value={t(`settings.options.${value.toLowerCase()}`)}
        onChange={handleChange}
        width={fullWidth - 16}
        haptics={!isItHaptics}
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
