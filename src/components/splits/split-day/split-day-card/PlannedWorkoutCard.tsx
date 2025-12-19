// PlannedWorkoutCard.tsx
import {
  SplitPlanWorkout,
  SplitPlanDay,
} from "../../../../stores/workout/types";
import { TouchableOpacity, ViewStyle, View } from "react-native";
import { useWorkoutStore } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
import { router } from "expo-router";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { useCorrectTime } from "../../../../features/format/useCorrectTime";
import { MidText } from "../../../ui/text/MidText";
import { DescriptionText } from "../../../ui/text/DescriptionText";

interface PlannedWorkoutCardProps {
  workout: SplitPlanWorkout;
  day: SplitPlanDay;
  dayIndex: number;
  splitId: string;
  style?: ViewStyle | ViewStyle[];
  onOpenTimePicker: (workout: SplitPlanWorkout) => void;
}

export function PlannedWorkoutCard({
  workout,
  day,
  dayIndex,
  splitId,
  style,
  onOpenTimePicker,
}: PlannedWorkoutCardProps) {
  const { getTemplateById, removeWorkoutFromDay } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const template = getTemplateById(workout.templateId);

  function handleRemoveWorkout() {
    removeWorkoutFromDay(splitId, dayIndex, workout.id);
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

  if (!template) return null;

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
          <MidText
            text={template.name}
            color={day.isRest ? theme.info : theme.text}
            style={{
              textDecorationLine: day.isRest ? "line-through" : "none",
              textAlign: "left",
            }}
          />
        </View>

        {!day.isRest && (
          <Fragment>
            {/* Time Button */}
            <StrobeButton
              onPress={() => onOpenTimePicker(workout)}
              hitSlop={10}
              style={{
                height: 34,
                width: 88,
                borderRadius: 17,
              }}
              strobeDisabled={workout.scheduledAt === undefined}
            >
              <DescriptionText
                text={
                  workout.scheduledAt
                    ? useCorrectTime(workout.scheduledAt)
                    : t("splits.set-time")
                }
                color={theme.text}
              />
            </StrobeButton>

            {/* Switch Template Button */}
            <TouchableOpacity
              onPress={handleSwitchTemplate}
              hitSlop={10}
              style={{ padding: 10 }}
            >
              <Ionicons name="swap-horizontal" size={24} color={theme.text} />
            </TouchableOpacity>

            {/* Remove Button */}
            <TouchableOpacity
              onPress={handleRemoveWorkout}
              hitSlop={10}
              style={{ padding: 10 }}
            >
              <Ionicons name="remove" size={24} color={theme.text} />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </StrobeBlur>
  );
}
