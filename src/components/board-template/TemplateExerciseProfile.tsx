import { useFadeInAnim } from "../../animations/useFadeInAnim";
import { WIDTH } from "../../features/Dimensions";
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

      <View style={{ width: WIDTH - 32, marginBottom: 16 }}>
        <RemoveExerciseButton />
        <SwapExerciseButton />
        <ExerciseColumnOptions />
      </View>

      <ExerciseNoteInput />
    </Animated.View>
  );
}
