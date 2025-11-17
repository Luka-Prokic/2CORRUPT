import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScreenView({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top + 16,
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
}
