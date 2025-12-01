import { useFadeInAnim } from "../../animations/useFadeInAnim";
import { Animated, View } from "react-native";
import { SwapExerciseButton } from "../board-workout/profile/SwapExerciseButton";
import { ExerciseColumnOptions } from "../board-workout/profile/ExerciseColumnOptions";
import { RestTimerSettings } from "../board-workout/profile/RestTimerSettings";
import { ExerciseHeader } from "../board-workout/profile/ExerciseHeader";
import { RemoveExerciseButton } from "../board-workout/profile/RemoveExerciseButton";
import { ExerciseNoteInput } from "../board-workout/profile/ExerciseNoteInput";
import { TemplateSheetType } from "../../app/template-board";

interface TemplateExerciseProfileProps {
  openPanel: () => void;
  setListType: (listType: TemplateSheetType) => void;
}

export function TemplateExerciseProfile({
  openPanel,
  setListType,
}: TemplateExerciseProfileProps) {
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{
        flex: 1,
        paddingHorizontal: 16,
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
