import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { Animated, View } from "react-native";
import { SwapExerciseButton } from "./SwapExerciseButton";
import { ExerciseColumnOptions } from "./ExerciseColumnOptions";
import { RestTimerSettings } from "./RestTimerSettings";
import { ExerciseHeader } from "./ExerciseHeader";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { ExerciseNoteInput } from "./ExerciseNoteInput";
import { SessionSheetType } from "../SessionDashboard";

interface ExerciseProfileProps {
  openPanel: () => void;
  setListType: (listType: SessionSheetType) => void;
}

export function ExerciseProfile({ openPanel, setListType }: ExerciseProfileProps) {
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
      <ExerciseHeader openPanel={openPanel} setListType={setListType} />
      <RestTimerSettings openPanel={openPanel} setListType={setListType} />

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
