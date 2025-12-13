import { ExerciseName } from "../../../../view-workout/table/header/ExerciseName";
import { View } from "react-native";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import {
  useCurrentExercise,
  useCurrentSetOfExercise,
} from "../../../../../features/workout/currentExercise";
import { SetRow } from "../../../../view-workout/table/set-row/SetRow";
import { SetTableHeader } from "../../../../view-workout/table/header/SetTableHeader";

export function CompleteExercise() {
  const { theme } = useSettingsStore();
  const { fullWidth, widgetUnit } = useWidgetUnit();

  const currentExercise = useCurrentExercise();
  const currentSet = useCurrentSetOfExercise(currentExercise);

  const setIndex = currentSet ? currentExercise.sets.indexOf(currentSet) : 0;

  if (!currentExercise || !currentSet) return null;

  return (
    <View
      style={{
        flex: 1,
        width: fullWidth,
      }}
    >
      <ExerciseName
        prefixColor={theme.text}
        exercise={currentExercise}
        height={widgetUnit - 44 - 34 - 66}
      />
      <SetTableHeader
        exercise={currentExercise}
        style={{ position: "relative" }}
        width={fullWidth}
        color={theme.info}
      />
      <SetRow
        set={currentSet}
        setIndex={setIndex}
        exercise={currentExercise}
        width={fullWidth}
        disabledStrobe
      />
    </View>
  );
}
