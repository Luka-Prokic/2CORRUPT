import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../../config/ThemeContext";

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  activeText?: string;
  inactiveText?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function ToggleButton({
  isActive,
  onToggle,
  activeText = "ON",
  inactiveText = "OFF",
  style,
  textStyle,
  disabled = false,
}: ToggleButtonProps) {
  const { theme } = useTheme();

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: isActive ? theme.tint : theme.primaryBackground,
      borderColor: theme.border,
    },
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    {
      color: isActive ? theme.secondaryText : theme.text,
    },
    disabled && { opacity: 0.5 },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={buttonTextStyle}>
        {isActive ? activeText : inactiveText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});
