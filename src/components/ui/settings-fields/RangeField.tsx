import { View } from "react-native";
import { IBubble } from "../containers/IBubble";
import { MidText } from "../text/MidText";
import { DescriptionText } from "../text/DescriptionText";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StrobeButton } from "../buttons/StrobeButton";
import { RangeSettingConfig } from "../../../config/settings/types";

interface RangeFieldProps {
  setting: RangeSettingConfig;
}

export function RangeField({ setting }: RangeFieldProps) {
  const { theme } = useSettingsStore();
  const [minValue, maxValue] = setting.select(useSettingsStore());

  const steps = setting.max - setting.min + 1;
  const range = Array.from({ length: steps }, (_, i) => i + setting.min);

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={setting.title} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        {range.map((val) => {
          const selected = val >= minValue && val <= maxValue;
          return (
            <StrobeButton
              key={val}
              title={val.toString()}
              pressable
              strobeColors={
                selected
                  ? [theme.accent, theme.primaryBackground, theme.tint, theme.caka]
                  : undefined
              }
              onPress={() => {
                // simple toggle behavior
                if (val < minValue) setting.update(useSettingsStore(), [val, maxValue]);
                else if (val > maxValue) setting.update(useSettingsStore(), [minValue, val]);
                else setting.update(useSettingsStore(), [val, val]); // single selection inside range
              }}
              style={{
                flex: 1,
                paddingVertical: 12,
                backgroundColor: selected ? theme.accent : theme.primaryBackground,
              }}
              textStyle={{ color: selected ? theme.primaryBackground : theme.text }}
            />
          );
        })}
      </View>
      {setting.description && (
        <DescriptionText text={setting.description} style={{ color: theme.grayText }} />
      )}
    </IBubble>
  );
}