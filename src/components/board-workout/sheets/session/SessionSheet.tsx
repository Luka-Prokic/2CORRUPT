import { View, Text, TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { useTranslation } from "react-i18next";
import { SessionNameInput } from "./SessionNameInput";
import { useState } from "react";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { Ionicons } from "@expo/vector-icons";
import { OptionButton } from "../../../ui/buttons/OptionButton";
import { DescriptionText } from "../../../ui/text/DescriptionText";

export function SessionSheet() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSession, updateSessionField } = useWorkoutStore();

  const [notes, setNotes] = useState(activeSession?.notes || "");

  const saveNotes = (value: string) => {
    if (!activeSession) return;
    updateSessionField(activeSession.id, "notes", value);
  };

  return (
    <View style={{ width: WIDTH, height: HEIGHT - 200, padding: 16 }}>
      <SessionNameInput />
      <DescriptionText
        style={{
          color: theme.grayText,
          textAlign: "justify",
          marginBottom: 16,
        }}
        text={t("workout-board.session-name-description")}
      />

      <TextInput
        style={{
          height: 280,
          width: WIDTH - 32,
          backgroundColor: theme.input,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          fontSize: 16,
          color: theme.text,
          textAlignVertical: "top",
        }}
        value={notes}
        onChangeText={(text) => {
          setNotes(text);
          saveNotes(text);
        }}
        placeholder={t("workout-board.add-session-notes-placeholder")}
        placeholderTextColor={theme.grayText}
        multiline
      />

      <OptionButton
        title={t("workout-board.clear-notes")}
        onPress={() => setNotes("")}
        icon={<Ionicons name={"remove-circle"} size={24} color={theme.error} />}
        color={theme.error}
      />
    </View>
  );
}
