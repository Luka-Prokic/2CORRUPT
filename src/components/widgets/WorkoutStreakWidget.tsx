import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import WidgetContainer from "./WidgetContainer";
import hexToRGBA from "../../hooks/HEXtoRGB";

interface WorkoutStreakWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function WorkoutStreakWidget({
  onPress,
  style,
}: WorkoutStreakWidgetProps) {
  const { theme } = useThemeStore();

  // Mock data
  const workoutStreak = 12;

  return (
    <WidgetContainer style={style} variant="inset">
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 12,
          padding: 12,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        activeOpacity={0.8}
      >
        {/* Streak Fire Icon */}
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="flame" size={24} color={theme.accent} />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            color: theme.text,
            marginBottom: 2,
          }}
        >
          {workoutStreak}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: theme.text,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: "600",
          }}
        >
          STREAK
        </Text>
      </TouchableOpacity>
    </WidgetContainer>
  );
}
