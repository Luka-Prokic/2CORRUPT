import { Text } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settingsStore";

export function DashLine({ char = "-", fontSize = 20 }) {
  const charWidth = fontSize * 0.5; // approximate width of one character
  const count = Math.floor(WIDTH / charWidth);
  const { theme } = useSettingsStore();

  return (
    <Text
      style={{
        color: theme.text,
        fontSize,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {char.repeat(count)}
    </Text>
  );
}
