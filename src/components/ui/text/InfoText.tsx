import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function InfoText({
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
        color: theme.info,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: -0.5,
        lineHeight: 24,
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
