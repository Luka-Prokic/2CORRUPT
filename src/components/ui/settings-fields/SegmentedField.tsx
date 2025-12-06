import { SegmentedSettingConfig } from "../../../config/settings/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { SegmentedButtons } from "../../ui/buttons/SegmentedButtons";
import { IText } from "../../ui/text/IText";

interface SegmentedFieldProps<T extends string> {
  setting: SegmentedSettingConfig<T>;
}

export function SegmentedField<T extends string>({
  setting,
}: SegmentedFieldProps<T>) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const settingsState = useSettingsStore();

  const value = setting.select(settingsState);

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={t(setting.title)} />
      <IText text={t(`settings.options.${value.toLowerCase()}`)} />
      <SegmentedButtons
        options={setting.options.map((o) => t(`settings.options.${o}`))}
        value={t(`settings.options.${value.toLowerCase()}`)}
        onChange={(newValue: string) =>
          setting.update(settingsState, newValue as T)
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
