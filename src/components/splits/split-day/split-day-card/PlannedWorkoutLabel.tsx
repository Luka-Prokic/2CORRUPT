import { SplitPlanWorkout } from "../../../../stores/workout/types";
import { ViewStyle } from "react-native";
import { useWorkoutStore } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { SplitPlanDay } from "../../../../stores/workout/types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { InfoText } from "../../../ui/text/InfoText";
import { useCorrectTime } from "../../../../features/format/useCorrectTime";
import { useMemo } from "react";

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

  const scheduledAt = useMemo(() => {
    return workout.scheduledAt
      ? useCorrectTime(workout.scheduledAt)
      : undefined;
  }, [workout.scheduledAt]);

  if (!template) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        height: 18,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        ...style,
      }}
    >
      <InfoText
        text={`${scheduledAt ? `${scheduledAt} - ` : ""}${template.name}`}
        color={theme.text}
        style={{ textDecorationLine: day.isRest ? "line-through" : "none" }}
      />
    </Animated.View>
  );
}
