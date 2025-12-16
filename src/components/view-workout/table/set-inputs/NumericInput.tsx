import { TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { ExerciseColumns } from "../../../../stores/workout/types";
import { Set } from "../../../../stores/workout/types";
import { useDisplayedUnits } from "../../../../features/translate/useDisplayedUnits";

interface NumericInputProps {
  set: Set;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
  disabled?: boolean;
}

export function NumericInput({ set, column, disabled }: NumericInputProps) {
  const { theme } = useSettingsStore();
  const { updateSetInActiveExercise } = useWorkoutStore();
  const { fromKg, toKg } = useDisplayedUnits();

  const handleUpdateSet = (text: string) => {
    const num = Number(text) || 0;
    if (column === "Weight") {
      updateSetInActiveExercise(set.id, { weight: toKg(num) });
    } else {
      updateSetInActiveExercise(set.id, { reps: num });
    }
  };

  const displayValue =
    column === "Weight" ? fromKg(set.weight || 0) : (set.reps ?? 0).toString();

  return (
    <TextInput
      style={{
        width: "100%",
        height: 66,
        fontSize: 16,
        textAlign: "center",
        color: theme.text,
      }}
      value={displayValue.toString()}
      onChangeText={handleUpdateSet}
      placeholder="0"
      placeholderTextColor={theme.grayText}
      keyboardType="numeric"
      selectTextOnFocus
      pointerEvents={disabled ? "none" : "auto"}
    />
  );
}
