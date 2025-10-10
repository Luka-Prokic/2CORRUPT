import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { Animated, View } from "react-native";
import { SwapExerciseButton } from "./SwapExerciseButton";
import { ExerciseColumnOptions } from "./ExerciseColumnOptions";
import { RestTimerSettings } from "./RestTimerSettings";
import { ExerciseHeader } from "./ExerciseHeader";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { AddToSupersetButton } from "./AddToSupersetButton";
import { ExerciseNoteInput } from "./ExerciseNoteInput";

export function ExerciseProfile() {
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{
        width: WIDTH,
        height: HEIGHT - 360,
        paddingHorizontal: 16,
        gap: 8,
        ...fadeIn,
      }}
    >
      <ExerciseHeader />
      <RestTimerSettings />

      <View style={{ width: WIDTH - 32, marginBottom: 16 }}>
        <RemoveExerciseButton />
        <SwapExerciseButton />
        {/* <AddToSupersetButton /> */}
        <ExerciseColumnOptions />
      </View>

      <ExerciseNoteInput />
    </Animated.View>
  );
}
