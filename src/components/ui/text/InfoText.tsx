import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface InfoTextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  color?: string;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
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
}

export function InfoText({
  text,
  style,
  color,
  align = "center",
  children,
  weight = "600",
  ...props
}: InfoTextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      {...props}
      style={{
        color: color ?? theme.info,
        fontSize: 12,
        fontWeight: weight,
        textAlign: align,
        letterSpacing: -0.5,
        lineHeight: 12,
        ...style,
      }}
    >
      {children}
      {text}
    </Text>
  );
}
