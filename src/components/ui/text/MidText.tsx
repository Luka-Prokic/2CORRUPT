import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface MidTextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
}

export function MidText({ text, style, color, ...props }: MidTextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        color: color ?? theme.text,
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 26,
        textAlign: "center",
        ...style,
      }}
      {...props}
    >
      {text}
    </Text>
  );
}
