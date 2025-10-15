import { useSettingsStore } from "../../../../../stores/settings";
import { StrobeBlur } from "../../../../ui/misc/StrobeBlur";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hexToRGBA } from "../../../../../features/HEXtoRGB";

interface RestDayCardProps {}

export function RestDayCard({}: RestDayCardProps) {
  const { theme } = useSettingsStore();

  return (
    <StrobeBlur
      style={{
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.border,
        height: 64,
      }}
      colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="bandage" size={32} color={theme.grayText} />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Rest Day
        </Text>
      </View>
    </StrobeBlur>
  );
}