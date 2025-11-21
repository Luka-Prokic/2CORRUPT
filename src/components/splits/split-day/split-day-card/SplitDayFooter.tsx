import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import {
  useWorkoutStore,
  SplitPlan,
  SplitPlanDay,
} from "../../../../stores/workout";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface SplitDayFooterProps {
  split: SplitPlan;
  day: SplitPlanDay;
  index: number;
  isGridView?: boolean;
}

export function SplitDayFooter({
  split,
  day,
  index,
  isGridView,
}: SplitDayFooterProps) {
  const { theme } = useSettingsStore();
  const { removeDayFromSplit, toggleDayRest, addDayToSplit } =
    useWorkoutStore();
  function handleRemoveDay() {
    removeDayFromSplit(split.id, index);
  }

  function handleCloneDay() {
    addDayToSplit(split.id, day, index + 1);
  }

  function handleToggleRest() {
    toggleDayRest(split.id, index);
  }
  return (
    <BlurView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: isGridView ? 44 : 64,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <TouchableOpacity onPress={handleRemoveDay} hitSlop={10}>
        <Ionicons
          name="remove-circle"
          size={isGridView ? 24 : 34}
          color={theme.error}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCloneDay} hitSlop={10}>
        <Ionicons
          name="duplicate"
          size={isGridView ? 24 : 34}
          color={theme.accent}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleToggleRest} hitSlop={10}>
        <Ionicons
          name={day.isRest ? "barbell" : "rainy"}
          size={isGridView ? 24 : 34}
          color={day.isRest ? theme.text : theme.secondaryText}
        />
      </TouchableOpacity>
    </BlurView>
  );
}
