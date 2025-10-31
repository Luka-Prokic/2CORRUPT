import { TextInput, View, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import {
  ExerciseColumns,
  DropSet,
  Set,
} from "../../../../stores/workout/types";
import { useDisplayedWeight } from "../../../../features/translate/useDisplayedWightUnit";

interface NumericDropInputProps {
  set: Set;
  drop: DropSet;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

export function NumericDropInput({
  set,
  drop,
  column,
  style,
  disabled,
}: NumericDropInputProps) {
  const { theme } = useSettingsStore();
  const { updateDropSetInActiveExercise } = useWorkoutStore();
  const { fromKg, toKg } = useDisplayedWeight();

  const handleUpdateDropSet = (text: string) => {
    const num = Number(text) || 0;
    if (column === "Weight") {
      updateDropSetInActiveExercise(set.id, drop.id, { weight: toKg(num) });
    } else {
      updateDropSetInActiveExercise(set.id, drop.id, { reps: num });
    }
  };

  const displayValue =
    column === "Weight"
      ? fromKg(drop.weight || 0)
      : (drop.reps ?? 0).toString();

  return (
    <View style={{ height: 44, width: "100%", ...style }}>
      <TextInput
        style={{
          width: "100%",
          height: 44,
          fontSize: 16,
          textAlign: "center",
          color: set.isCompleted ? theme.secondaryText : theme.grayText,
        }}
        value={displayValue.toString()}
        onChangeText={handleUpdateDropSet}
        placeholder="0"
        placeholderTextColor={theme.grayText}
        keyboardType="numeric"
        pointerEvents={disabled ? "none" : "auto"}
      />
    </View>
  );
}
