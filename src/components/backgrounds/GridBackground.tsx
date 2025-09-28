import React from "react";
import { View, ViewStyle, Dimensions } from "react-native";
import { useBackgroundStore } from "../../stores/backgroundStore";

interface GridBackgroundProps {
  color?: string;
  lineColor?: string;
  gridSize?: number;
  lineWidth?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function GridBackground({ 
  color, 
  lineColor,
  gridSize,
  lineWidth,
  style 
}: GridBackgroundProps) {
  const { 
    color: storeColor, 
    lineColor: storeLineColor,
    gridSize: storeGridSize,
    lineWidth: storeLineWidth,
  } = useBackgroundStore();
  
  const backgroundColor = color || storeColor;
  const gridLineColor = lineColor || storeLineColor;
  const gridSpacing = gridSize || storeGridSize;
  const lineThickness = lineWidth || storeLineWidth;
  const { width, height } = Dimensions.get('window');
  
  // Calculate offset to center the grid
  const offsetX = (width % gridSpacing) / 2;
  const offsetY = (height % gridSpacing) / 2;
  
  // Create grid lines using View components
  const verticalLines = [];
  const horizontalLines = [];
  
  // Generate vertical lines with offset
  for (let i = -gridSpacing; i <= width + gridSpacing; i += gridSpacing) {
    verticalLines.push(
      <View
        key={`v-${i}`}
        style={{
          position: "absolute",
          left: i + offsetX,
          top: 0,
          width: lineThickness,
          height: height,
          backgroundColor: gridLineColor,
        }}
      />
    );
  }
  
  // Generate horizontal lines with offset
  for (let i = -gridSpacing; i <= height + gridSpacing; i += gridSpacing) {
    horizontalLines.push(
      <View
        key={`h-${i}`}
        style={{
          position: "absolute",
          left: 0,
          top: i + offsetY,
          width: width,
          height: lineThickness,
          backgroundColor: gridLineColor,
        }}
      />
    );
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
      {verticalLines}
      {horizontalLines}
    </View>
  );
}
