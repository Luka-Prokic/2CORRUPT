import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import WidgetContainer from "./WidgetContainer";
import hexToRGBA from "../../hooks/HEXtoRGB";

interface AllButtonWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function AllButtonWidget({
  onPress,
  style,
}: AllButtonWidgetProps) {
  const { theme } = useThemeStore();

  return (
    <WidgetContainer style={style} variant="inset">
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 12,
          padding: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
      >
        <Ionicons
          name="grid-outline"
          size={24}
          color={theme.grayText}
          style={{ marginBottom: 4 }}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: theme.grayText,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          ALL
        </Text>
      </TouchableOpacity>
    </WidgetContainer>
  );
}
