import {
  DimensionValue,
  ViewStyle,
  TouchableOpacity,
  View,
  TextStyle,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";

interface OptionButtonProps {
  title: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  styleTitle?: TextStyle | TextStyle[];
  color?: string;
  disabled?: boolean;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export function OptionButton({
  title,
  onPress,
  icon,
  width = "100%",
  height = 34,
  style,
  styleTitle,
  color,
  disabled,
  justifyContent = "space-between",
}: OptionButtonProps) {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        flexDirection: "row",
        alignItems: "center",
        justifyContent,
        paddingHorizontal: 8,
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <MidText
        text={title}
        style={{ color: color || theme.text, ...styleTitle }}
      />
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 8,
        }}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
}
