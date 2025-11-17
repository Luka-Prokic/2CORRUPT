import React, { useMemo } from "react";
import {
  View,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../features/Dimensions";

interface TemplateNameInputProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
}

export function TemplateNameInput({
  value,
  onChangeText,
  placeholder,
  style,
}: TemplateNameInputProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: WIDTH - 32,
        height: 64,
        marginBottom: 32,
        backgroundColor: theme.input,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 8,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        ...style,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          paddingHorizontal: 16,
          color: theme.text,
          fontSize: 24,
        }}
        placeholderTextColor={theme.grayText}
        placeholder={placeholder || t("workout-view.template-name")}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          style={{ position: "absolute", right: 16 }}
        >
          <Ionicons name="close-circle" size={32} color={theme.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}
