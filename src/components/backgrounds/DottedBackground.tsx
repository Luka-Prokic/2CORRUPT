import React from "react";
import { View, ViewStyle, Dimensions } from "react-native";
import { useBackgroundStore } from "../../stores/backgroundStore";

interface DottedBackgroundProps {
  color?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function DottedBackground({ 
  color, 
  dotColor,
  dotSize,
  dotSpacing,
  style 
}: DottedBackgroundProps) {
  const { 
    color: storeColor, 
    dotColor: storeDotColor,
    dotSize: storeDotSize,
    dotSpacing: storeDotSpacing,
  } = useBackgroundStore();
  
  const backgroundColor = color || storeColor;
  const dotFillColor = dotColor || storeDotColor;
  const dotRadius = dotSize || storeDotSize;
  const spacing = dotSpacing || storeDotSpacing;
  
  const { width, height } = Dimensions.get('window');
  
  // Create dots using View components
  const dots = [];
  
  // Generate dots in a grid pattern
  for (let x = 0; x <= width; x += spacing) {
    for (let y = 0; y <= height; y += spacing) {
      dots.push(
        <View
          key={`dot-${x}-${y}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: dotRadius * 2,
            height: dotRadius * 2,
            borderRadius: dotRadius,
            backgroundColor: dotFillColor,
          }}
        />
      );
    }
  }

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
    >
      {dots}
    </View>
  );
}
