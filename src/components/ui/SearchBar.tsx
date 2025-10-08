import React from "react";
import { View, TextInput, ViewStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
}

export function SearchBar({
  value,
  onChangeText,
  placeholder,
  style,
}: SearchBarProps) {
  const { theme } = useSettingsStore();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.input,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 8,
        ...style,
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color={theme.grayText}
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={{
          flex: 1,
          color: theme.text,
          fontSize: 16,
        }}
        placeholder={placeholder || "Search..."}
        placeholderTextColor={theme.grayText}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          style={{ position: "absolute", right: 12 }}
        >
          <Ionicons name="close-circle" size={20} color={theme.error} />
        </TouchableOpacity>
      )}
    </View>
  );
}
