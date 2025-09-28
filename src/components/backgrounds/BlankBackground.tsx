import React from "react";
import { View, ViewStyle } from "react-native";
import { useBackgroundStore } from "../../stores/backgroundStore";

interface BlankBackgroundProps {
  color?: string;
  style?: ViewStyle | ViewStyle[];
}

export default function BlankBackground({ 
  color, 
  style 
}: BlankBackgroundProps) {
  const { color: storeColor } = useBackgroundStore();
  const backgroundColor = color || storeColor;

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    />
  );
}
