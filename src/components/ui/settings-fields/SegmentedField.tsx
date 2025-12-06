import { SegmentedSettingConfig } from "../../../config/settings/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { SegmentedButtons } from "../../ui/buttons/SegmentedButtons";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

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

  function handleChange(newValue: string) {
    const index = setting.options.findIndex(
      (o) => t(`settings.options.${o}`) === newValue
    );
    if (index >= 0) {
      setting.update(settingsState, setting.options[index]);
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
