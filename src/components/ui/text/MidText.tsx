import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface MidTextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "bold"
    | "800"
    | "900";
  align?: "left" | "center" | "right";
}

export function MidText({
  text,
  style,
  color,
  weight = "600",
  align = "center",
  ...props
}: MidTextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      {...props}
      style={{
        color: color ?? theme.text,
        fontSize: 18,
        fontWeight: weight,
        lineHeight: 26,
        textAlign: align,

        ...style,
      }}
    >
      {text}
    </Text>
  );
}
