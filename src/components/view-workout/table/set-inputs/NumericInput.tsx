import { TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { ExerciseColumns, Set } from "../../../../stores/workout/types";
import { useDisplayedWeight } from "../../../../features/translate/useDisplayedWightUnit";
import { useValidateRepsAndWeight } from "../../../../features/validate/useValidateRepsAndWight";

interface NumericInputProps {
  set: Set;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
}

export function NumericInput({ set, column }: NumericInputProps) {
  const { theme } = useSettingsStore();
  const { updateSetInActiveExercise } = useWorkoutStore();
  const [value, handleChange] = useValidateRepsAndWeight(set[column] || 0);
  const { fromKg, toKg } = useDisplayedWeight();

  const handleUpdateSet = (setId: string, updates: any) => {
    updateSetInActiveExercise(setId, updates);
  };

  if (column === "Weight") {
    return (
      <TextInput
        style={{
          width: "100%",
          height: 66,
          fontSize: 16,
          textAlign: "center",
          color: theme.text,
        }}
        value={fromKg(value)}
        onChangeText={handleChange}
        onBlur={() => handleUpdateSet(set.id, { [column]: toKg(value) })}
        placeholder="0"
        placeholderTextColor={theme.grayText}
        keyboardType="numeric"
      />
    );
  }
  return (
    <TextInput
      style={{
        width: "100%",
        height: 66,
        fontSize: 16,
        textAlign: "center",
        color: theme.text,
      }}
      value={value.toString()}
      onChangeText={handleChange}
      onBlur={() => handleUpdateSet(set.id, { [column]: value })}
      placeholder="0"
      placeholderTextColor={theme.grayText}
      keyboardType="numeric"
    />
  );
}
