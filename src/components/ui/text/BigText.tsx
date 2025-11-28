import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function BigText({
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
        color: theme.text,
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 32,
        textAlign: "center",
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
