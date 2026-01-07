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
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";

export interface InputFieldProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  fontSize?: number;
  textColor?: string;
  styleView?: ViewStyle | ViewStyle[];
  onBlurCustom?: () => void;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  fontSize = 64,
  textColor,
  styleView,
  onBlurCustom,
  ...textInputProps
}: InputFieldProps) {
  const { theme } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const color = textColor ?? theme.text;

  const handleSave = () => {
    const trimmed = value?.trim();
    if (trimmed?.length > 0 && trimmed !== value) {
      onChangeText?.(trimmed);
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
          value={value}
          onChangeText={onChangeText}
          onBlur={(e) => {
            handleSave();
            onBlurCustom?.();
            textInputProps.onBlur?.(e);
          }}
          onSubmitEditing={(e) => {
            handleSave();
            onBlurCustom?.();
            textInputProps.onSubmitEditing?.(e);
          }}
          placeholder={placeholder}
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
          <MidText text={value || placeholder} />

          <Ionicons name="pencil" size={24} color={theme.grayText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
