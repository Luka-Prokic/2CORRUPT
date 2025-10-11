import { useState } from "react";
import { TextInput, ViewStyle, View } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  ExerciseColumns,
  DropSet,
  Set,
} from "../../../../stores/workout/types";
import { useDisplayedWeight } from "../../../../features/translate/useDisplayedWightUnit";
import { useWorkoutStore } from "../../../../stores/workoutStore";

interface NumericDropInputProps {
  set: Set;
  drop: DropSet;
  column: Extract<ExerciseColumns, "Weight" | "Reps">;
  style?: ViewStyle | ViewStyle[];
}

export function NumericDropInput({
  set,
  drop,
  column,
  style,
}: NumericDropInputProps) {
  const { theme } = useSettingsStore();
  const { fromKg, toKg } = useDisplayedWeight();
  const { updateDropSetInActiveExercise } = useWorkoutStore();
  const [value, setValue] = useState(drop[column] || 0);

  const handleUpdateSet = (dropId: string, updates: any) => {
    updateDropSetInActiveExercise(set.id, dropId, updates);
  };

  if (column === "Weight") {
    return (
      <View style={{ height: 44, width: "100%", ...style }}>
        <TextInput
          style={{
            height: 44,
            width: "100%",
            fontSize: 16,
            textAlign: "center",
            color: set.isCompleted ? theme.secondaryText : theme.grayText,
          }}
          value={fromKg(value)}
          onBlur={() => handleUpdateSet(set.id, { [column]: value })}
          onChangeText={(text) => setValue(toKg(Number(text)))}
          placeholder="0"
          placeholderTextColor={theme.grayText}
          keyboardType="numeric"
        />
      </View>
    );
  }
  return (
    <View style={{ height: 44, width: "100%", ...style }}>
      <TextInput
        style={{
          height: 44,
          width: "100%",
          fontSize: 16,
          textAlign: "center",
          color: set.isCompleted ? theme.secondaryText : theme.grayText,
        }}
        value={value.toString()}
        onChangeText={(text) => setValue(Number(text))}
        onBlur={() => handleUpdateSet(set.id, { [column]: value })}
        placeholder="0"
        placeholderTextColor={theme.grayText}
        keyboardType="numeric"
      />
    </View>
  );
}
