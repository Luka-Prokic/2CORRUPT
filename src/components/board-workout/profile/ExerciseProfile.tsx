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
  openPanel: () => void;
  setListType: (listType: SessionSheetType) => void;
}

export function ExerciseProfile({
  openPanel,
  setListType,
}: ExerciseProfileProps) {
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{
        flex: 1,
        gap: 8,
        ...fadeIn,
      }}
    >
      <ExerciseHeader openPanel={openPanel} setListType={setListType} />
      <RestTimerSettings openPanel={openPanel} setListType={setListType} />

      <View>
        <RemoveExerciseButton />
        <SwapExerciseButton />
        <ExerciseColumnOptions />
      </View>

      <ExerciseNoteInput />
    </Animated.View>
  );
}
