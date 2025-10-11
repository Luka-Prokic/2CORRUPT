import { useState } from "react";
import { TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { ExerciseColumns, Set } from "../../../../stores/workout/types";
import { useDisplayedWeight } from "../../../../features/translate/useDisplayedWightUnit";

interface NumericInputProps {
  set: Set;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
}

export function NumericInput({ set, column }: NumericInputProps) {
  const { theme } = useSettingsStore();
  const { updateSetInActiveExercise } = useWorkoutStore();
  const { fromKg, toKg } = useDisplayedWeight();
  const [value, setValue] = useState(set[column] || 0);

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
        onBlur={() => handleUpdateSet(set.id, { [column]: value })}
        onChangeText={(text) => setValue(toKg(Number(text)))}
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
      onChangeText={(text) => setValue(Number(text))}
      onBlur={() => handleUpdateSet(set.id, { [column]: value })}
      placeholder="0"
      placeholderTextColor={theme.grayText}
      keyboardType="numeric"
    />
  );
}
