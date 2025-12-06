import { View } from "react-native";
import { StrobeButton } from "../buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settingsStore";

interface SegmentedButtonsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  haptics?: boolean;
}

export function SegmentedButtons({
  options,
  value,
  onChange,
  haptics,
}: SegmentedButtonsProps) {
  const { theme } = useSettingsStore();


  function handlePress(option: string) {
    if (value !== option) {
      onChange(option);
    }
  }

  return (
    <View style={{ flexDirection: "row", borderRadius: 8, overflow: "hidden" }}>
      {options.map((option, index) => (
        <StrobeButton
          key={option}
          title={option}
          pressable
          strobeDisabled
          onPress={() => handlePress(option)}
            style={{
              flex: 1,
              marginHorizontal: 2,
              paddingVertical: 12,
              backgroundColor: value === options[index]
                ? theme.fifthBackground
                : theme.primaryBackground,
            }}
        />
      ))}
    </View>
  );
}
