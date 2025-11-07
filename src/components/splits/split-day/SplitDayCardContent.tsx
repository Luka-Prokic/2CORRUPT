import { View, Text, FlatList } from "react-native";
import { SplitPlan, SplitPlanDay } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { PlannedWorkoutCard } from "./PlannedWorkoutCard";
import { Ionicons } from "@expo/vector-icons";
import { TextButton } from "../../ui/buttons/TextButton";
import { router } from "expo-router";

interface SplitDayCardContentProps {
  split: SplitPlan;
  day: SplitPlanDay;
  dayIndex: number;
  hasWorkouts: boolean;
}

export function SplitDayCardContent({
  split,
  day,
  dayIndex,
  hasWorkouts,
}: SplitDayCardContentProps) {
  const { theme } = useSettingsStore();

  function handleAddWorkout() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: { splitId: split.id, dayIndex: dayIndex },
    });
  }

  if (hasWorkouts) {
    return (
      <FlatList
        data={day.workouts}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlannedWorkoutCard
            workout={item}
            day={day}
            dayIndex={dayIndex}
            splitId={split.id}
          />
        )}
        ListHeaderComponent={() => <View style={{ height: 64 }} />}
        ListFooterComponent={() => <View style={{ height: 64 }} />}
      />
    );
  }

  // Empty placeholder for active days only
  if (!day.isRest) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Ionicons
          name="bandage-outline"
          size={48}
          color={theme.secondaryBackground}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: theme.secondaryBackground,
            textAlign: "center",
          }}
        >
          No workouts yet
        </Text>
        <TextButton title="+ Add Workout" onPress={handleAddWorkout} />
      </View>
    );
  }

  return null;
}
