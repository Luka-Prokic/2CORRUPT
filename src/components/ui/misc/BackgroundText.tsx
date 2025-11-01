import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function BackgroundText({
  text,
  style,
}: {
  text: string;
  style?: TextStyle | TextStyle[];
}) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        color: theme.handle,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: -0.5,
        lineHeight: 24,
        textAlign: "center",
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
