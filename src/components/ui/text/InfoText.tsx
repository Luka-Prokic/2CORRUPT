import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface InfoTextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export function InfoText({
  text,
  style,
  color,
  align = "center",
  children,
  ...props
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
      {...props}
    >
      {children}
      {text}
    </Text>
  );
}
