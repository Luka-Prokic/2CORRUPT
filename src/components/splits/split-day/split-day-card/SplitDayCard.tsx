import { ViewStyle, FlatList, View } from "react-native";
import {
  SplitPlan,
  SplitPlanDay,
  SplitPlanWorkout,
  useWorkoutStore,
} from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SplitDayGridHeader } from "../SplitDayGridHeader";
import { SplitDayFooter } from "./SplitDayFooter";
import { PlannedWorkoutLabel } from "./PlannedWorkoutLabel";
import { SplitDayCardHeader } from "./SplitDayCardHeader";
import { SplitDayCardContent } from "./SplitDayCardContent";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextButton } from "../../../ui/buttons/TextButton";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { BackgroundText } from "../../../ui/text/BackgroundText";
import { useTranslation } from "react-i18next";

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
}: SplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { t } = useTranslation();

  // Shared time picker state (now lives here)
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerWorkout, setPickerWorkout] = useState<SplitPlanWorkout | null>(
    null
  );
  const [pickerTime, setPickerTime] = useState<Date>(new Date());
  const { updateWorkoutInDay } = useWorkoutStore();
  function openTimePicker(workout: any) {
    setPickerWorkout(workout);
    setPickerTime(
      workout.scheduledAt ? new Date(workout.scheduledAt) : new Date()
    );
    setShowTimePicker(true);
  }

  function closeTimePicker() {
    setShowTimePicker(false);
    setPickerWorkout(null);
  }
  function handleTimeConfirm(date: Date | null) {
    if (pickerWorkout) {
      updateWorkoutInDay(split.id, index, pickerWorkout.id, {
        scheduledAt: date?.toISOString() ?? undefined,
      });
    }
    closeTimePicker();
  }

  // -------- TIME PICKER OVERLAY --------
  if (showTimePicker) {
    return (
      <StrobeBlur
        style={{
          height: fullWidth,
          width: fullWidth,
          backgroundColor: theme.thirdBackground,
          borderRadius: 32,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BackgroundText
            text={t("splits.suggested-start-time")}
            style={{
              color: theme.text,
            }}
          />
        </View>

        <DateTimePicker
          value={pickerTime}
          mode="time"
          display="spinner"
          onChange={(_, selectedDate) => {
            if (selectedDate) setPickerTime(selectedDate);
          }}
        />
        <StrobeBlur
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            width: fullWidth,
          }}
          styleContent={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextButton
            text={t("button.remove")}
            onPress={() => {
              handleTimeConfirm(null);
            }}
            color={theme.error}
            style={{ width: "33%" }}
          />
          <TextButton
            text={t("button.cancel")}
            onPress={closeTimePicker}
            color={theme.grayText}
            style={{ width: "33%" }}
          />
          <TextButton
            text={t("button.done")}
            onPress={() => handleTimeConfirm(pickerTime)}
            color={theme.text}
            style={{ width: "33%" }}
          />
        </StrobeBlur>
      </StrobeBlur>
    );
  }

  const workoutCount = day.workouts.length;
  const hasWorkouts = workoutCount > 0;

  // ---------- NON GRID VIEW ----------
  if (!isGridView) {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          justifyContent: "space-between",
          backgroundColor: day.isRest ? theme.handle : theme.thirdBackground,
          borderRadius: 32,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: "hidden",
          ...style,
        }}
      >
        <SplitDayCardHeader
          day={day}
          dayIndex={index}
          workoutCount={workoutCount}
          splitId={split.id}
        />

        <SplitDayCardContent
          split={split}
          day={day}
          dayIndex={index}
          hasWorkouts={hasWorkouts}
          onOpenTimePicker={openTimePicker}
        />

        <SplitDayFooter
          split={split}
          day={day}
          index={index}
          isGridView={isGridView}
        />
      </Animated.View>
    );
  }

  // ---------- GRID VIEW ----------
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        paddingVertical: 44,
        justifyContent: "space-between",
        backgroundColor: day.isRest ? theme.handle : theme.thirdBackground,
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        overflow: "hidden",
        ...style,
      }}
    >
      <SplitDayGridHeader dayIndex={index} />

      <FlatList
        data={day.workouts}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlannedWorkoutLabel workout={item} day={day} />
        )}
      />

      <SplitDayFooter
        split={split}
        day={day}
        index={index}
        isGridView={isGridView}
      />
    </Animated.View>
  );
}
