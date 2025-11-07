import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutSession,
} from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";

interface SessionNameInputProps {
  session?: WorkoutSession;
  fontSize?: number;
  textColor?: string;
}

export function SessionNameInput({
  session,
  fontSize = 64,
  textColor,
}: SessionNameInputProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { activeSession, updateSessionField } = useWorkoutStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(
    session?.name || activeSession?.name || ""
  );

  const inputRef = useRef<TextInput>(null);

  const currentSession = session ?? activeSession;
  const color = textColor ?? theme.text;

  const handleSave = () => {
    if (!currentSession) return;
    const trimmed = tempName.trim();
    if (trimmed.length > 0 && trimmed !== currentSession.name) {
      updateSessionField(currentSession.id, "name", trimmed);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (!currentSession) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 44,
        width: "100%",
      }}
    >
      {isEditing ? (
        <TextInput
          ref={inputRef}
          value={tempName}
          onChangeText={setTempName}
          onBlur={handleSave}
          onSubmitEditing={handleSave}
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color,
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: color,
          }}
          placeholder={t("workout-board.session-name")}
          placeholderTextColor={theme.grayText}
          returnKeyType="done"
          blurOnSubmit
        />
      ) : (
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 44,
          }}
        >
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: "bold",
              color,
              flexShrink: 1,
              textAlign: "center",
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          >
            {currentSession.name}
          </Text>

          <Ionicons name="pencil" size={24} color={theme.grayText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
