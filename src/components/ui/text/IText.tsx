import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface ITextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  size?: number;
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
  color?: string;
}

export function IText({
  text,
  style,
  size = 28,
  weight = "bold",
  color,
}: ITextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        fontSize: size,
        fontWeight: weight,
        color: color ?? theme.text,
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
