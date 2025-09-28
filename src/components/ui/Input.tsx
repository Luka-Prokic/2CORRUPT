import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeContext";

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}: InputProps) {
  const { theme } = useTheme();

  return (
    <View style={{ position: "relative" }}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={theme.grayText}
          style={{
            position: "absolute",
            left: 16,
            top: 18,
            zIndex: 1,
          }}
        />
      )}
      <TextInput
        style={{
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.input || theme.background,
          shadowColor: theme.shadow || "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          fontSize: 16,
          paddingVertical: 8,
          paddingLeft: icon ? 48 : 16,
          paddingRight: showPasswordToggle ? 48 : 16,
          borderRadius: 10,
          borderWidth: 1,
          height: 56,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.grayText}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
      {showPasswordToggle && (
        <TouchableOpacity
          onPress={onTogglePassword}
          style={{
            position: "absolute",
            right: 16,
            top: 18,
            paddingHorizontal: 4,
          }}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={theme.grayText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
