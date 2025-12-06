import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useHaptics } from "../../../features/ui/useHaptics";

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  activeText?: string;
  inactiveText?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  haptics?: boolean;
}

export function ToggleButton({
  isActive,
  onToggle,
  activeText = "ON",
  inactiveText = "OFF",
  style,
  textStyle,
  disabled = false,
  haptics = false,
}: ToggleButtonProps) {
  const { theme } = useSettingsStore();
  const triggerHapticsSoft = useHaptics({ modeType: "on", hapticType: "soft" });

  function handlePress() {
    onToggle();
    if (haptics) {
      triggerHapticsSoft();
    }
  }

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 32,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 60,
        backgroundColor: isActive ? theme.tint : theme.primaryBackground,
        borderColor: isActive ? theme.tint : theme.border,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: isActive ? theme.secondaryText : theme.text,
          opacity: disabled ? 0.5 : 1,
          ...textStyle,
        }}
      >
        {isActive ? activeText : inactiveText}
      </Text>
    </TouchableOpacity>
  );
}
