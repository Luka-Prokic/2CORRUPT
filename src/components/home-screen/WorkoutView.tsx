import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";

interface WorkoutViewProps {
  onBackPress: () => void;
  style?: ViewStyle;
}

export default function WorkoutView({ onBackPress, style }: WorkoutViewProps) {
  const { theme } = useThemeStore();

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        },
        style,
      ]}
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
          backgroundColor: theme.accent,
          borderRadius: 100,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={24} color={theme.border} />
      </TouchableOpacity>

      {/* Workout Content */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.text,
          textAlign: "center",
        }}
      >
        Workout Screen
      </Text>

      {/* Additional workout content can be added here */}
      <Text
        style={{
          fontSize: 16,
          color: theme.grayText,
          textAlign: "center",
          marginTop: 16,
          paddingHorizontal: 20,
        }}
      >
        This is where your workout will begin...
      </Text>
    </View>
  );
}
