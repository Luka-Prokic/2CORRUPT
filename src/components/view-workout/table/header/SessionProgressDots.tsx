import { View } from "react-native";
import {
  useWorkoutStore,
  Set,
} from "../../../../stores/workoutStore";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { SessionExercise } from "../../../../stores/workout/types";

export function SessionProgressDots() {
  const { theme } = useSettingsStore();
  const { activeSession, activeExercise } = useWorkoutStore();

  if (!activeSession) return null;

  const flatItems = activeSession.layout;

  const getDotColor = (item: SessionExercise) => {
    if (item.id === activeExercise?.id) return theme.accent;
    if (item.sets.length === 0) return theme.grayText;
    const allSetsCompleted = item.sets.every(
      (s: Set) => s.isCompleted
    );
    if (allSetsCompleted) return theme.tint;

    return theme.grayText;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        height: 34,
        marginBottom: 4,
      }}
    >
      {flatItems.length > 1 &&
        flatItems.map((item: SessionExercise, index: number) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: getDotColor(item),
            }}
          />
        ))}
    </View>
  );
}
