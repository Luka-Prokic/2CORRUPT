import {
  StyleSheet,
  DimensionValue,
  ViewStyle,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

interface OptionButtonProps {
  title: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  icon?: React.ReactNode;
  style?: ViewStyle;
  color?: string;
  disabled?: boolean;
}

export function OptionButton({
  title,
  onPress,
  icon,
  width = "100%",
  height = 34,
  style,
  color,
  disabled,
}: OptionButtonProps) {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity
      style={[styles.container, style, { width, height }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, { color: color || theme.text }]}>
        {title}
      </Text>
      <View style={styles.icon}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
});
