import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface InfoTextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
  align?: "left" | "center" | "right";
}

export function InfoText({
  text,
  style,
  color,
  align = "center",
}: InfoTextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        color: color ?? theme.info,
        fontSize: 12,
        fontWeight: "600",
        textAlign: align,
        letterSpacing: -0.5,
        lineHeight: 12,
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
