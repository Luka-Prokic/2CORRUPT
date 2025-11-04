import { SplitPlanWorkout } from "../../../stores/workout/types";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SplitPlanDay } from "../../../stores/workout/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface PlannedWorkoutCardProps {
  workout: SplitPlanWorkout;
  day: SplitPlanDay;
  dayIndex: number;
  onLongPressDrag?: () => void;
  isDragging?: boolean;
}
export function PlannedWorkoutCard({
  workout,
  day,
  dayIndex,
  onLongPressDrag,
  isDragging,
}: PlannedWorkoutCardProps) {
  const { getTemplateById, removeWorkoutFromDay } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { splitId } = useLocalSearchParams<{
    splitId: string;
  }>();

  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  function handleRemoveWorkout() {
    removeWorkoutFromDay(splitId, dayIndex, workout.id);
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPressDrag}
      style={{
        height: 44,
        opacity: isDragging ? 0.6 : 1,
        backgroundColor: isDragging ? theme.thirdBackground : "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      disabled={day.isRest}
    >
      <Text
        style={{
          color: day.isRest ? theme.info : theme.text,
          textDecorationLine: day.isRest ? "line-through" : "none",
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        {template.name}
      </Text>
      {!day.isRest && (
        <TouchableOpacity
          onPress={handleRemoveWorkout}
          hitSlop={10}
          style={{ padding: 5, height: 34, width: 34 }}
        >
          <Ionicons name="remove" size={24} color={theme.text} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
