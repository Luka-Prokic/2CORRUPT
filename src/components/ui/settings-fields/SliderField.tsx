import { View } from "react-native";
import { IBubble } from "../containers/IBubble";
import { MidText } from "../text/MidText";
import { DescriptionText } from "../text/DescriptionText";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StrobeButton } from "../buttons/StrobeButton";
import { SliderSettingConfig } from "../../../config/settings/types";

interface SliderFieldProps {
  setting: SliderSettingConfig;
}

export function SliderField({ setting }: SliderFieldProps) {
  const { theme } = useSettingsStore();
  const value = setting.select(useSettingsStore());

  return (
    <IBubble size="flexible" style={{ padding: 16 }} styleContent={{ gap: 16 }}>
      <MidText text={setting.title} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        {Array.from({ length: setting.max - setting.min + 1 }).map((_, i) => {
          const stepValue = i + setting.min;
          const selected = stepValue === value;
          return (
            <StrobeButton
              key={stepValue}
              title={stepValue.toString()}
              pressable
              strobeColors={
                selected
                  ? [theme.accent, theme.primaryBackground, theme.tint, theme.caka]
                  : undefined
              }
              onPress={() => setting.update(useSettingsStore(), stepValue)}
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