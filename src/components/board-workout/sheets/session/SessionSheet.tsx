import { View, Text, TextInput } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { useTranslation } from "react-i18next";
import { SessionNameInput } from "./SessionNameInput";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { Ionicons } from "@expo/vector-icons";
import { OptionButton } from "../../../ui/buttons/OptionButton";

type TemplateFields = {
  focus: string;
  gym: string;
  goal: string;
  mood: string;
  sleep: string;
};

export function SessionSheet() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSession, updateSessionField } = useWorkoutStore();

  const [isTemplateMode, setIsTemplateMode] = useState(false);
  const [notes, setNotes] = useState(activeSession?.notes || "");

  const [template, setTemplate] = useState<TemplateFields>({
    focus: "",
    gym: "",
    goal: "",
    mood: "",
    sleep: "",
  });

  const saveNotes = (value: string) => {
    if (!activeSession) return;
    updateSessionField(activeSession.id, "notes", value);
  };

  useEffect(() => {
    if (!activeSession?.notes) return;

    const parsed: typeof template = {
      focus: "",
      gym: "",
      goal: "",
      mood: "",
      sleep: "",
    };

    Object.keys(parsed).forEach((key) => {
      const regex = new RegExp(
        `• ${key[0].toUpperCase() + key.slice(1)} - ([\\s\\S]*?) •`,
        "m"
      );
      const match = activeSession.notes.match(regex);
      if (match) parsed[key as keyof typeof template] = match[1];
    });

    setTemplate(parsed);
    setNotes(activeSession.notes);
  }, [activeSession]);

  // Update handler

  return (
    <View style={{ width: WIDTH, height: HEIGHT - 200, padding: 16 }}>
      <SessionNameInput />
      <Text
        style={{
          fontSize: 14,
          color: theme.grayText,
          textAlign: "justify",
          marginBottom: 32,
          lineHeight: 18,
        }}
      >
        {t("workout-board.session-name-description")}
      </Text>

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
        icon={
          <Ionicons
            name={"remove-circle-outline"}
            size={20}
            color={theme.error}
          />
        }
        color={theme.error}
      />
      <Text
        style={{
          fontSize: 14,
          color: theme.grayText,
          textAlign: "justify",
          lineHeight: 18,
          marginTop: 16,
        }}
      >
        {t("workout-board.notes-description")}
      </Text>
    </View>
  );
}

function NotesTemplateItem({
  templateKey,
  template,
  setTemplate,
  notes,
  setNotes,
  saveNotes,
}: {
  templateKey: string;
  template: TemplateFields;
  setTemplate: (template: TemplateFields) => void;
  notes: string;
  setNotes: (notes: string) => void;
  saveNotes: (notes: string) => void;
}) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const handleTemplateChange = (key: keyof typeof template, value: string) => {
    const updated = { ...template, [key]: value };
    setTemplate(updated); // update input immediately

    const marker = `• ${key[0].toUpperCase() + key.slice(1)} - `;
    const endMarker = " •";

    let newNotes: string;

    if (notes.includes(marker)) {
      newNotes = notes.replace(
        new RegExp(`${marker}[\\s\\S]*?${endMarker}`, "m"),
        `${marker}${value}${endMarker}`
      );
    } else {
      newNotes = notes
        ? notes + `\n${marker}${value}${endMarker}`
        : `${marker}${value}${endMarker}`;
    }

    setNotes(newNotes);
    saveNotes(newNotes);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 56,
        backgroundColor: theme.input,
        paddingHorizontal: 4,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 18,
          textAlign: "right",
          width: "25%",
          lineHeight: 56,
        }}
      >
        {templateKey[0].toUpperCase() + templateKey.slice(1) + " -"}
      </Text>
      <TextInput
        value={template[templateKey as keyof typeof template]}
        onChangeText={(v) =>
          handleTemplateChange(templateKey as keyof typeof template, v)
        }
        style={{
          color: theme.text,
          fontSize: 18,
          width: "75%",
          height: "100%",
          textAlignVertical: "center",
          paddingHorizontal: 4,
        }}
        placeholder={`Enter ${templateKey}`}
        placeholderTextColor={theme.grayText}
      />
    </View>
  );
}
