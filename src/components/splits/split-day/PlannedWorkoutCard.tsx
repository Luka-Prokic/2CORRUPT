import { SplitPlanWorkout } from "../../../stores/workout/types";
import { TouchableOpacity, ViewStyle, TextInput, View } from "react-native";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { SplitPlanDay } from "../../../stores/workout/types";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { IsoDateString } from "../../../stores/workout/types";
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
  const { getTemplateById, removeWorkoutFromDay, updateWorkoutInDay } =
    useWorkoutStore();
  const { theme, themeMode } = useSettingsStore();
  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  // Extract time from ISO string or use empty string
  const getTimeFromISO = (isoString?: IsoDateString): string => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  const [scheduledTime, setScheduledTime] = useState(
    getTimeFromISO(workout.scheduledAt)
  );

  function handleRemoveWorkout() {
    removeWorkoutFromDay(splitId, dayIndex, workout.id);
  }

  function handleTimeChange(text: string) {
    setScheduledTime(text);
  }

  function handleTimeBlur() {
    // Convert time string to ISO date string on blur
    // Use today's date with the entered time
    if (scheduledTime.trim()) {
      const [hours, minutes] = scheduledTime.split(":").map(Number);
      if (
        !isNaN(hours) &&
        !isNaN(minutes) &&
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60
      ) {
        const today = new Date();
        today.setHours(hours, minutes, 0, 0);
        const isoString = today.toISOString() as IsoDateString;
        updateWorkoutInDay(splitId, dayIndex, workout.id, {
          scheduledAt: isoString,
        });
      } else {
        // Invalid time format, clear it
        setScheduledTime("");
        updateWorkoutInDay(splitId, dayIndex, workout.id, {
          scheduledAt: undefined,
        });
      }
    } else {
      // Clear scheduled time
      updateWorkoutInDay(splitId, dayIndex, workout.id, {
        scheduledAt: undefined,
      });
    }
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
            {/* Time Input */}
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                width: 100,
              }}
            >
              <Ionicons name="time-outline" size={16} color={theme.grayText} />
              <TextInput
                style={{
                  color: theme.text,
                  borderRadius: 8,
                  fontSize: 12,
                  minWidth: 44,
                  height: 44,
                }}
                value={scheduledTime}
                onChangeText={handleTimeChange}
                onBlur={handleTimeBlur}
                placeholder="14:30"
                placeholderTextColor={theme.grayText}
                editable={!day.isRest}
                keyboardType="numeric"
              />
            </View> */}

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
