import {
  FlatList,
  FlatListProps,
  Pressable,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useRef, useState, memo } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";

interface CardFlatListProps extends FlatListProps<any> {
  title?: string;
}

export function CardFlatList({
  title,
  contentContainerStyle,
  ...props
}: CardFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useSettingsStore();

  return (
    <View style={{ gap: 4, justifyContent: "center", alignItems: "center" }}>
      {title && (
        <Text
          style={{ fontSize: 14, fontWeight: "bold", color: theme.grayText }}
        >
          {title}
        </Text>
      )}
      <View style={contentContainerStyle}>
        <FlatList ref={flatListRef} {...props} />
      </View>
    </View>
  );
}
