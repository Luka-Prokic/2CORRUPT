import { View } from "react-native";
import { SwapExerciseButton } from "./SwapExerciseButton";
import { ExerciseColumnOptions } from "./ExerciseColumnOptions";
import { RestTimerSettings } from "./RestTimerSettings";
import { ExerciseHeader } from "./ExerciseHeader";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { ExerciseNoteInput } from "./ExerciseNoteInput";
import { SessionSheetType } from "../../../app/workout-board";
import Animated, { FadeIn } from "react-native-reanimated";

interface ExerciseProfileProps {
  setSheetType: (sheetType: SessionSheetType) => void;
}

export function ExerciseProfile({ setSheetType }: ExerciseProfileProps) {
  return (
    <Animated.View
      style={{
        flex: 1,
        gap: 8,
      }}
      entering={FadeIn}
    >
      <ExerciseHeader setSheetType={setSheetType} />
      <RestTimerSettings setSheetType={setSheetType} />

      <View>
        <RemoveExerciseButton />
        <SwapExerciseButton />
        <ExerciseColumnOptions />
      </View>

      <ExerciseNoteInput />
    </Animated.View>
  );
}
