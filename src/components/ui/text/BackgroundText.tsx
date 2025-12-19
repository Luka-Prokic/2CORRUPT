import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface BackgroundTextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  align?: "center" | "left" | "right";
}

export function BackgroundText({
  text,
  style,
  align = "center",
}: BackgroundTextProps) {
  const { theme } = useSettingsStore();

  return (
    <Text
      style={{
        color: theme.handle,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: -0.5,
        lineHeight: 24,
        textAlign: align,
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
