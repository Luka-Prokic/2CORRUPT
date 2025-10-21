import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutTemplate,
} from "../../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";

export interface TemplateNameInputProps extends TextInputProps {
  template?: WorkoutTemplate;
  fontSize?: number;
  textColor?: string;
  styleView?: ViewStyle | ViewStyle[];
  onBlurCustom?: () => void;
}

export function TemplateNameInput({
  template,
  fontSize = 64,
  textColor,
  styleView,
  onBlurCustom,
  ...textInputProps
}: TemplateNameInputProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { activeTemplate, updateTemplateField } = useWorkoutStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(
    template?.name || activeTemplate?.name || ""
  );

  const inputRef = useRef<TextInput>(null);

  const currentTemplate = template ?? activeTemplate;
  const color = textColor ?? theme.text;

  const handleSave = () => {
    if (!currentTemplate) return;
    const trimmed = tempName.trim();
    if (trimmed.length > 0 && trimmed !== currentTemplate.name) {
      updateTemplateField(currentTemplate.id, "name", trimmed);
    }
    setIsEditing(false);
    onBlurCustom?.();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (currentTemplate)
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          height: 44,
          width: "100%",
          ...styleView,
        }}
      >
        {isEditing ? (
          <TextInput
            ref={inputRef}
            value={tempName}
            onChangeText={setTempName}
            onBlur={(e) => {
              handleSave();
              textInputProps.onBlur?.(e);
            }}
            onSubmitEditing={(e) => {
              handleSave();
              textInputProps.onSubmitEditing?.(e);
            }}
            placeholder={t("template-view.template-name")}
            placeholderTextColor={theme.grayText}
            returnKeyType="done"
            blurOnSubmit
            {...textInputProps}
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color,
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: color,
            }}
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
              {currentTemplate.name}
            </Text>

            <Ionicons name="pencil" size={24} color={theme.grayText} />
          </TouchableOpacity>
        )}
      </View>
    );
  return null;
}
