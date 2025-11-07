import { SplitPlanWorkout } from "../../../stores/workout/types";
import { ViewStyle } from "react-native";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { SplitPlanDay } from "../../../stores/workout/types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface PlannedWorkoutLabelProps {
  workout: SplitPlanWorkout;
  day: SplitPlanDay;
  style?: ViewStyle | ViewStyle[];
}

export function PlannedWorkoutLabel({
  workout,
  day,
  style,
}: PlannedWorkoutLabelProps) {
  const { getTemplateById } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        height: 18,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        ...style,
      }}
    >
      <Text
        style={{
          color: theme.text,
          textDecorationLine: day.isRest ? "line-through" : "none",
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        00:00-{template.name}
      </Text>
    </Animated.View>
  );
}
