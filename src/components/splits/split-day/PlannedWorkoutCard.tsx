import { SplitPlanWorkout } from "../../../stores/workout/types";
import { TouchableOpacity, ViewStyle, View } from "react-native";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { SplitPlanDay } from "../../../stores/workout/types";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
import { router } from "expo-router";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";

interface PlannedWorkoutCardProps {
  workout: SplitPlanWorkout;
  day: SplitPlanDay;
  dayIndex: number;
  splitId: string;
  style?: ViewStyle | ViewStyle[];
}

export function PlannedWorkoutCard({
  workout,
  day,
  dayIndex,
  splitId,
  style,
}: PlannedWorkoutCardProps) {
  const { getTemplateById, removeWorkoutFromDay } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  function handleRemoveWorkout() {
    removeWorkoutFromDay(splitId, dayIndex, workout.templateId);
  }

  function handleSwitchTemplate() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: {
        splitId,
        dayIndex: String(dayIndex),
        workoutId: workout.id,
        mode: "swap",
      },
    });
  }

  return (
    <StrobeBlur
      style={{
        height: 64,
        ...style,
      }}
      disabled={day.isRest}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 16,
        }}
      >
        {/* Workout Name */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: day.isRest ? theme.info : theme.text,
              textDecorationLine: day.isRest ? "line-through" : "none",
              fontSize: 16,
              fontWeight: "600",
            }}
            numberOfLines={1}
          >
            {template.name}
          </Text>
        </View>
        {!day.isRest && (
          <Fragment>
            {/* Switch Template Button */}
            <TouchableOpacity
              onPress={handleSwitchTemplate}
              hitSlop={10}
              style={{
                padding: 10,
              }}
            >
              <Ionicons name="swap-horizontal" size={24} color={theme.text} />
            </TouchableOpacity>

            {/* Remove Button */}
            <TouchableOpacity
              onPress={handleRemoveWorkout}
              hitSlop={10}
              style={{
                padding: 10,
              }}
            >
              <Ionicons name="remove" size={24} color={theme.background} />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </StrobeBlur>
  );
}
