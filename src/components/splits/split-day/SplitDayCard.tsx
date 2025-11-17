import { ViewStyle, FlatList } from "react-native";
import { SplitPlan, SplitPlanDay } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SplitDayGridHeader } from "./SplitDayGridHeader";
import { SplitDayFooter } from "./SplitDayFooter";
import { PlannedWorkoutLabel } from "./PlannedWorkoutLabel";
import { SplitDayCardHeader } from "./SplitDayCardHeader";
import { SplitDayCardContent } from "./SplitDayCardContent";

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

  const workoutCount = day.workouts.length;
  const hasWorkouts = workoutCount > 0;

  // For non-grid view, show editing features
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

  // Grid view - keep original simple layout
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
