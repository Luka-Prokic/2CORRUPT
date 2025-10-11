import { Keyboard, TextInput } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useState } from "react";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";

export function ExerciseNoteInput() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
  const [notes, setNotes] = useState(activeExercise.notes);
  const { t } = useTranslation();

  function handleNotesChange(text: string) {
    setNotes(text);
    updateActiveExercise({ ...activeExercise, notes: text });
  }

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
      placeholder={t("workout-board.add-notes-placeholder")}
      placeholderTextColor={theme.grayText}
      onChangeText={handleNotesChange}
      multiline
      textAlignVertical="top"
      returnKeyType="done"
      blurOnSubmit={true}
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  );
}
