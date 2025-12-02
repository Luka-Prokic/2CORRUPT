import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function MidText({
  text,
  style,
  color,
}: {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
}) {
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
    >
      {text}
    </Text>
  );
}
