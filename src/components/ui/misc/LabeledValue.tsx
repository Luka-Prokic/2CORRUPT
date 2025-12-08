import { View, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

interface LabeledValueProps {
  label: string;
  value: string | number | React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  align?: "left" | "center" | "right";
}

export function LabeledValue({
  label,
  value,
  style,
  labelStyle,
  valueStyle,
  align = "left",
}: LabeledValueProps) {
  const { theme } = useSettingsStore();

  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignItems:
            align === "center"
              ? "center"
              : align === "right"
              ? "flex-end"
              : "flex-start",
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: theme.info,
            fontSize: 18,
            marginBottom: 2,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>

      {typeof value === "string" || typeof value === "number" ? (
        <Text
          style={[
            {
              color: theme.text,
              fontSize: 24,
              fontWeight: "600",
            },
            valueStyle,
          ]}
        >
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}
