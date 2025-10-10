import { TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { ExerciseColumns, Set } from "../../../../stores/workout/types";

interface NumericInputProps {
  set: Set;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
}

export function NumericInput({ set, column }: NumericInputProps) {
  const { theme } = useSettingsStore();
  const { updateSetInActiveExercise } = useWorkoutStore();

  const handleUpdateSet = (setId: string, updates: any) => {
    updateSetInActiveExercise(setId, updates);
  };

  return (
    <TextInput
      style={{
        width: "100%",
        height: 66,
        fontSize: 16,
        textAlign: "center",
        color: theme.text,
      }}
      value={set[column]}
      onChangeText={(text) => handleUpdateSet(set.id, { [column]: text })}
      placeholder="0"
      placeholderTextColor={theme.grayText}
      keyboardType="numeric"
    />
  );
}
