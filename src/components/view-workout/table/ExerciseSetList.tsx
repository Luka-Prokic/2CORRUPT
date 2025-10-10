import { FlatList } from "react-native";
import { SetRow } from "./set-row/SetRow";
import { useWorkoutStore } from "../../../stores/workoutStore";

export function ExerciseSetList() {
  const { activeExercise } = useWorkoutStore();

  const sets = activeExercise?.sets ?? [];

  return (
    <FlatList
      data={sets}
      keyExtractor={(item) => `${item.id}-${activeExercise?.id}`}
      renderItem={({ item, index }) => <SetRow set={item} setIndex={index} />}
      contentContainerStyle={{ paddingBottom: 96 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
