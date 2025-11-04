import { Keyboard, TextInput } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useState } from "react";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { SplitPlan } from "../../stores/workout/types";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

interface SplitNoteInputProps {
  split: SplitPlan;
}
export function SplitNoteInput({ split }: SplitNoteInputProps) {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { updateSplitPlanField } = useWorkoutStore();
  const [notes, setNotes] = useState(split.description);
  const { t } = useTranslation();

  function handleNotesChange(text: string) {
    setNotes(text);
    updateSplitPlanField(split.id, "description", text);
  }

  return (
    <TextInput
      style={{
        width: fullWidth,
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
        shadowOpacity: 0.1,
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
