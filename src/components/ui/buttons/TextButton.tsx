import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

interface TextButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  color?: string;
}

export function TextButton({
  title,
  style,
  textStyle,
  color,
  ...rest
}: TextButtonProps) {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          {
            fontSize: 18,
            fontWeight: "600",
            color: color ?? theme.tint,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
