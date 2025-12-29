import { View, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";
import { IText } from "../text/IText";

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
          justifyContent: "space-between",
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
      <MidText
        text={label}
        weight="500"
        color={theme.info}
        style={labelStyle}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
      />

      {typeof value === "string" || typeof value === "number" ? (
        <IText
          text={value.toString()}
          weight="500"
          style={[
            {
              color: theme.text,
              fontSize: 24,
              fontWeight: "600",
            },
            valueStyle,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        />
      ) : (
        value
      )}
    </View>
  );
}
