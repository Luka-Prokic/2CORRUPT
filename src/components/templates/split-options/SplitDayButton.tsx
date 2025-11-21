import {
  ViewStyle,
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { SplitPlan, SplitPlanDay } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import { PlannedWorkoutLabel } from "../../splits/split-day/split-day-card/PlannedWorkoutLabel";
import { SplitDayHeader } from "../../splits/split-day/SplitDayHeader";

interface SplitDayButtonProps extends TouchableOpacityProps {
  split: SplitPlan;
  day: SplitPlanDay;
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export function SplitDayButton({
  split,
  day,
  index,
  style,
  ...props
}: SplitDayButtonProps) {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity activeOpacity={0.75} {...props}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          paddingTop: 44,
          justifyContent: "space-between",
          backgroundColor: day.isRest ? theme.handle : theme.thirdBackground,
          borderColor: theme.border,
          borderRadius: 32,
          borderWidth: 1,
          overflow: "hidden",
          ...style,
        }}
      >
        <SplitDayHeader dayIndex={index} />

        <FlatList
          data={day.workouts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <PlannedWorkoutLabel workout={item} day={day} />
          )}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
