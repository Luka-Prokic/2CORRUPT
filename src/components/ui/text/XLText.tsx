import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function XLText({
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
        fontSize: 28,
        fontWeight: "bold",
        color: theme.text,
      }}
    >
      {text}
    </Text>
  );
}
