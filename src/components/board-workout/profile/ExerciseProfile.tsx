import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import { Animated, View } from "react-native";
import { SwapExerciseButton } from "./SwapExerciseButton";
import { ExerciseColumnOptions } from "./ExerciseColumnOptions";
import { RestTimerSettings } from "./RestTimerSettings";
import { ExerciseHeader } from "./ExerciseHeader";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { ExerciseNoteInput } from "./ExerciseNoteInput";
import { SessionSheetType } from "../../../app/workout-board";

interface ExerciseProfileProps {
  setSheetType: (sheetType: SessionSheetType) => void;
}

export function ExerciseProfile({ setSheetType }: ExerciseProfileProps) {
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{
        flex: 1,
        gap: 8,
        ...fadeIn,
      }}
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
