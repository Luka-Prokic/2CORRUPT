import React from "react";
import { useThemeStore } from "../../stores/themeStore";
import StrobeBlur from "../ui/misc/StrobeBlur";
import { Text } from "react-native";
import hexToRGBA from "../../hooks/HEXtoRGB";
import BounceButton from "../ui/buttons/BounceButton";

interface StartWorkoutButtonProps {
  style?: any;
  onPress?: () => void;
}

export default function StartWorkoutButton({
  style,
  onPress,
}: StartWorkoutButtonProps) {
  const { theme } = useThemeStore();

  return (
    <BounceButton
      onPress={onPress}
      style={[style, { height: 64, borderRadius: 100 }]}
      color={hexToRGBA(theme.accent, 0.2)}
    >
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        style={{ width: "100%", height: "100%" }}
        duration={5000}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>
          Start Workout
        </Text>
      </StrobeBlur>
    </BounceButton>
  );
}
