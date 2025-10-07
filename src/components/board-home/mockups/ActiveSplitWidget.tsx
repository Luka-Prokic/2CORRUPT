import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WidgetContainer } from "./WidgetContainer";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";

interface ActiveSplitWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export function ActiveSplitWidget({ onPress, style }: ActiveSplitWidgetProps) {
  const { theme } = useSettingsStore();

  return (
    <WidgetContainer style={style}>
      <StrobeBlur
        style={{
          flex: 1,
        }}
        colors={[
          hexToRGBA(theme.caka, 1),
          hexToRGBA(theme.primaryBackground, 1),
          hexToRGBA(theme.accent, 1),
          hexToRGBA(theme.tint, 1),
        ]}
        duration={5000}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <View
            style={{
              flexDirection: "row",
              height: 34,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: theme.fifthBackground,
                marginBottom: 4,
              }}
            >
              ACTIVE SPLIT
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              color: theme.tint,
              marginBottom: 6,
            }}
          >
            Push Pull Legs
          </Text>
        </TouchableOpacity>
      </StrobeBlur>
    </WidgetContainer>
  );
}
