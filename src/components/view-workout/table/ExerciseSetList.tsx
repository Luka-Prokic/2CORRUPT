import { SetRow } from "./set-row/SetRow";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { HEIGHT } from "../../../features/Dimensions";

// import { FlatList } from "react-native";

// export function ExerciseSetList() {
//   const { activeExercise } = useWorkoutStore();

//   const sets = activeExercise?.sets ?? [];

//   return (
//     <FlatList
//       data={sets}
//       keyExtractor={(item) => `${item.id}-${activeExercise?.id}`}
//       renderItem={({ item, index }) => <SetRow set={item} setIndex={index} />}
//       contentContainerStyle={{ paddingBottom: 96 }}
//     />
//   );
// }

export function ExerciseSetList() {
  const { activeExercise } = useWorkoutStore();

  const sets = activeExercise?.sets ?? [];

  return (
    <KeyboardAwareFlatList
      data={sets}
      keyExtractor={(item) => `${item.id}-${activeExercise?.id}`}
      renderItem={({ item, index }) => <SetRow set={item} setIndex={index} />}
      extraScrollHeight={20}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: HEIGHT / 2 }}
    />
  );
}
