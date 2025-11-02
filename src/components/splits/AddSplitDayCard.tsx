import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SplitPlan, useWorkoutStore } from "../../stores/workout";
import { useSettingsStore } from "../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface AddSplitDayCardProps {
  split: SplitPlan;
  style?: ViewStyle | ViewStyle[];
}

export function AddSplitDayCard({ split, style }: AddSplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { addDayToSplit } = useWorkoutStore();

  function handleAddDay() {
    addDayToSplit(split.id);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        padding: 16,
        flex: 1,
        backgroundColor: theme.primaryBackground,
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        ...style,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={handleAddDay}
      >
        <Ionicons name="add" size={64} color={theme.text} />
      </TouchableOpacity>
    </Animated.View>
  );
}
