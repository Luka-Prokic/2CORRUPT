import React from "react";
import { useSettingsStore } from "../../stores/settingsStore";
import StrobeBlur from "../ui/misc/StrobeBlur";
import { Text } from "react-native";
import hexToRGBA from "../../features/HEXtoRGB";
import BounceButton from "../ui/buttons/BounceButton";
import { HEIGHT } from "../../features/Dimensions";

interface StartWorkoutButtonProps {
  onPress?: () => void;
}

export default function StartWorkoutButton({
  onPress,
}: StartWorkoutButtonProps) {
  const { theme } = useSettingsStore();

  return (
    <BounceButton
      onPress={onPress}
      style={{
        height: 64,
        borderRadius: 100,
        marginHorizontal: 16,
        bottom: HEIGHT / 2 - 64,
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
      }}
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
