import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  SplitPlan,
  SplitPlanDay,
  useWorkoutStore,
} from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { PlannedWorkoutsList } from "../PlannedWorkoutsList";
import { router } from "expo-router";

interface SplitDayCardProps {
  split: SplitPlan;
  day: SplitPlanDay;
  index: number;
  style?: ViewStyle | ViewStyle[];
  isGridView?: boolean;
  onLongPressDrag?: () => void;
}

export function SplitDayCard({
  split,
  day,
  index,
  style,
  isGridView,
  onLongPressDrag,
}: SplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { removeDayFromSplit, toggleDayRest, addDayToSplit } =
    useWorkoutStore();

  function handleRemoveDay() {
    removeDayFromSplit(split.id, index);
  }

  function handleCloneDay() {
    addDayToSplit(split.id, day, index + 1);
  }

  function handleAddWorkout() {
    router.push({
      pathname: `/splits/[splitId]/[dayIndex]/add`,
      params: {
        splitId: split.id,
        dayIndex: index.toString(),
      },
    });
  }

  function handleToggleRest() {
    toggleDayRest(split.id, index);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        padding: 16,
        justifyContent: "space-between",
        backgroundColor: day.isRest
          ? theme.handle
          : hexToRGBA(theme.thirdBackground, 0.6),
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        ...style,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 34,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: day.isRest ? theme.info : theme.tint,
          }}
          numberOfLines={1}
        >
          Day {index + 1}
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {!isGridView && !day.isRest && (
            <TouchableOpacity onPress={handleAddWorkout} hitSlop={10}>
              <Ionicons
                name="add-circle"
                size={isGridView ? 24 : 34}
                color={theme.text}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleCloneDay} hitSlop={10}>
            <Ionicons
              name="duplicate-outline"
              size={isGridView ? 24 : 34}
              color={theme.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveDay} hitSlop={10}>
            <Ionicons
              name="remove"
              size={isGridView ? 24 : 34}
              color={day.isRest ? theme.error : theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {!isGridView && <PlannedWorkoutsList day={day} dayIndex={index} />}

      {/* Footer  */}
      <TouchableOpacity
        onPress={handleToggleRest}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 34,
        }}
      >
        <Text
          style={{ fontSize: 12, color: theme.info }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {day.isRest ? "SET AS ACITVE" : "SET AS REST"}
        </Text>
        <Ionicons
          name={day.isRest ? "rainy" : "barbell"}
          size={34}
          color={day.isRest ? theme.info : theme.text}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
