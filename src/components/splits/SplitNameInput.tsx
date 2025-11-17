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
import { useSettingsStore } from "../../stores/settings";
import { useWorkoutStore } from "../../stores/workout";
import { useTranslation } from "react-i18next";
import { SplitPlan } from "../../stores/workout";

export interface SplitNameInputProps extends TextInputProps {
  split: SplitPlan;
  fontSize?: number;
  textColor?: string;
  styleView?: ViewStyle | ViewStyle[];
  onBlurCustom?: () => void;
  disabled?: boolean;
}

export function SplitNameInput({
  split,
  fontSize = 64,
  textColor,
  styleView,
  onBlurCustom,
  disabled = false,
  ...textInputProps
}: SplitNameInputProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { updateSplitPlanField } = useWorkoutStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(split.name || "");

  const inputRef = useRef<TextInput>(null);

  const color = textColor ?? theme.text;

  const handleSave = () => {
    const trimmed = tempName.trim();
    if (trimmed.length > 0 && trimmed !== split.name) {
      updateSplitPlanField(split.id, "name", trimmed);
    }
    setIsEditing(false);
    onBlurCustom?.();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

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
          placeholder={t("splits.split-name")}
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
          disabled={disabled}
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
            {split.name}
          </Text>

          {!disabled && (
            <Ionicons name="pencil" size={24} color={theme.grayText} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
