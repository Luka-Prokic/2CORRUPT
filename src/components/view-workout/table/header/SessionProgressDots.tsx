import { View } from "react-native";
import {
  useWorkoutStore,
  SessionLayoutItem,
  Set,
} from "../../../../stores/workoutStore";
import { useSettingsStore } from "../../../../stores/settingsStore";

export function SessionProgressDots() {
  const { theme } = useSettingsStore();
  const { activeSession, activeExercise } = useWorkoutStore();

  if (!activeSession) return null;

  const getDotColor = (item: SessionLayoutItem) => {
    if (item.type === "exercise") {
      if (item.exercise.id === activeExercise?.id) return theme.accent;
      if (item.exercise.sets.length === 0) return theme.grayText;
      const allSetsCompleted = item.exercise.sets.every(
        (s: Set) => s.isCompleted
      );
      return allSetsCompleted ? theme.tint : theme.grayText;
    } else if (item.type === "superset" || item.type === "circuit") {
      // Group is considered "completed" if all exercises inside have all sets completed
      const allCompleted = item.exercises.every((ex) =>
        ex.sets.every((s) => s.isCompleted)
      );
      const isActive = item.exercises.some(
        (ex) => ex.id === activeExercise?.id
      );
      if (isActive) return theme.caka;
      return allCompleted ? theme.tint : theme.grayText;
    }
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
      {activeSession.layout.map((item) => (
        <View
          key={item.id}
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
