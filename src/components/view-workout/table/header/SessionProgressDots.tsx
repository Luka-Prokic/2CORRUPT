import { View } from "react-native";
import { useWorkoutStore, Set } from "../../../../stores/workoutStore";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { SessionExercise } from "../../../../stores/workout/types";

export function SessionProgressDots() {
  const { theme } = useSettingsStore();
  const { activeSession, activeExercise } = useWorkoutStore();

  if (!activeSession) return null;

  const flatItems = activeSession.layout;

  const getDotColor = (item: SessionExercise) => {
    if (item.id === activeExercise?.id) return theme.text;
    const allSetsCompleted = item.sets.every((s: Set) => s.isCompleted);
    if (allSetsCompleted) return theme.grayText;
    return theme.handle;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
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
