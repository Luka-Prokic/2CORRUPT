import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import WidgetContainer from "./WidgetContainer";

interface PlanWidgetProps {
  style?: ViewStyle;
}

interface WorkoutData {
  name: string;
  isRest: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function PlanWidget({ style }: PlanWidgetProps) {
  const { theme } = useThemeStore();

  // Hardcoded training split data - just workout names
  const workouts: WorkoutData[] = [
    { name: "Push", isRest: false, icon: "fitness" },
    { name: "Pull", isRest: false, icon: "barbell" },
    { name: "Legs", isRest: false, icon: "walk" },
    { name: "Rest", isRest: true, icon: "bed" },
  ];

  const renderWorkoutBlock = (workout: WorkoutData, index: number) => {
    return (
      <View
        key={workout.name}
        style={[
          styles.workoutBlock,
          {
            backgroundColor: workout.isRest
              ? theme.secondaryBackground
              : theme.primaryBackground,
          },
        ]}
      >
        <Ionicons
          name={workout.icon}
          size={14}
          color={workout.isRest ? theme.grayText : theme.accent}
          style={styles.workoutIcon}
        />
        <Text
          style={[
            styles.workoutName,
            {
              color: workout.isRest ? theme.grayText : theme.text,
              fontWeight: workout.isRest ? "400" : "600",
            },
          ]}
        >
          {workout.name}
        </Text>
      </View>
    );
  };

  return (
    <WidgetContainer
      style={[
        style || {},
        {
          minHeight: 120,
        },
      ]}
      variant="elevated"
    >
      <Text>Plan</Text>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
  },
  workoutBlock: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 20,
  },
  workoutIcon: {
    marginRight: 6,
  },
  workoutName: {
    fontSize: 12,
    textAlign: "center",
  },
});
