import { Keyboard, TextInput } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useState } from "react";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";

export function ExerciseNoteInput() {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const [notes, setNotes] = useState(activeExercise.notes);

  return (
    <TextInput
      style={{
        backgroundColor: theme.input,
        color: theme.text,
        borderColor: theme.border,
        shadowColor: theme.shadow,
        fontSize: 16,
        minHeight: 126,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      }}
      value={notes}
      placeholder="Add notes..."
      placeholderTextColor={theme.grayText}
      onChangeText={setNotes}
      multiline
      textAlignVertical="top"
      returnKeyType="done"
      blurOnSubmit={true}
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  );
}
