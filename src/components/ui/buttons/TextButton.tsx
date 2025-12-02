import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

interface TextButtonProps extends Omit<TouchableOpacityProps, "style"> {
  text: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  color?: string;
}

export function TextButton({
  text,
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
        {text}
      </Text>
    </TouchableOpacity>
  );
}
