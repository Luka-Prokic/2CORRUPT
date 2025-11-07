import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

export function DescriptionText({
  text,
  style,
  short = false,
}: {
  text: string;
  style?: TextStyle | TextStyle[];
  short?: boolean; // if true, max 3 lines
}) {
  const { theme } = useSettingsStore();
  return (
    <Text
      numberOfLines={short ? 3 : undefined} // limit to 3 lines if short
      ellipsizeMode={short ? "tail" : undefined} // show ellipsis if truncated
      style={{
        color: theme.info,
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
