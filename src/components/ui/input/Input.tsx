import {
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { forwardRef } from "react";

interface InputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
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
      ...rest
    }: InputProps,
    ref: React.RefObject<TextInput>
  ) => {
    const { theme } = useSettingsStore();

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
          ref={ref}
          style={{
            borderColor: theme.border,
            color: theme.text,
            backgroundColor: theme.input || theme.background,
            shadowColor: theme.shadow || "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
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
          {...rest}
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
);
