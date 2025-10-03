import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import WorkoutScreenMockup from "../board-workout/mockups/WorkoutScreenMockup";
import StrobeBlur from "../ui/misc/StrobeBlur";

interface WorkoutViewProps {
  onBackPress: () => void;
  style?: ViewStyle;
}

export default function WorkoutView({ onBackPress, style }: WorkoutViewProps) {
  const { theme, themeName } = useSettingsStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBackPress}
        style={{
          position: "absolute",
          top: 22,
          left: 22,
          padding: 10,
          zIndex: 1,
          // backgroundColor: theme.accent,
          borderRadius: 100,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={24} color={theme.border} />
      </TouchableOpacity>

      <WorkoutScreenMockup />
    </View>
  );
}
