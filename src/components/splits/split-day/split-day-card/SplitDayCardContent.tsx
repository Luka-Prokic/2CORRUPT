import { View, Text, FlatList } from "react-native";
import {
  SplitPlan,
  SplitPlanDay,
  useWorkoutStore,
} from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { PlannedWorkoutCard } from "./PlannedWorkoutCard";
import { Ionicons } from "@expo/vector-icons";
import { TextButton } from "../../../ui/buttons/TextButton";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { MidText } from "../../../ui/text/MidText";
import { DescriptionText } from "../../../ui/text/DescriptionText";

interface SplitDayCardContentProps {
  split: SplitPlan;
  day: SplitPlanDay;
  dayIndex: number;
  hasWorkouts: boolean;

  // Picker now comes from SplitDayCard
  onOpenTimePicker: (workoutWithConfirm: {
    id: string;
    onConfirm: (date: Date) => void;
  }) => void;
}

export function SplitDayCardContent({
  split,
  day,
  dayIndex,
  hasWorkouts,
  onOpenTimePicker,
}: SplitDayCardContentProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { updateWorkoutInDay } = useWorkoutStore();

  function handleAddWorkout() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: { splitId: split.id, dayIndex },
    });
  }

  // ------------------ Workouts List ------------------
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
            onOpenTimePicker={() =>
              onOpenTimePicker({
                id: item.id,
                onConfirm: (date: Date) =>
                  updateWorkoutInDay(split.id, dayIndex, item.id, {
                    scheduledAt: date.toISOString(),
                  }),
              })
            }
          />
        )}
        ListHeaderComponent={() => <View style={{ height: 64 }} />}
        ListFooterComponent={() => <View style={{ height: 64 }} />}
      />
    );
  }

  // ------------------ Empty placeholder for active days only ------------------
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
          name="alert-outline"
          size={64}
          color={theme.secondaryBackground}
        />
        <DescriptionText
          text={t("splits.no-workouts-yet")}
          color={theme.secondaryBackground}
        />
        <TextButton
          text={`+ ${t("splits.add-workout")}`}
          onPress={handleAddWorkout}
        />
      </View>
    );
  }

  return null;
}
