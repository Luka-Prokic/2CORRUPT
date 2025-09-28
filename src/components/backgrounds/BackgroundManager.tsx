import React from "react";
import { ViewStyle } from "react-native";
import BlankBackground from "./BlankBackground";
import GridBackground from "./GridBackground";
import DottedBackground from "./DottedBackground";
import { useBackgroundStore } from "../../stores/backgroundStore";

export type BackgroundType = "blank" | "grid" | "dotted";

interface BackgroundManagerProps {
  style?: ViewStyle | ViewStyle[];
}

export default function BackgroundManager({
  style,
}: BackgroundManagerProps) {
  const {
    type,
    color,
    lineColor,
    dotColor,
    gridSize,
    lineWidth,
    dotSize,
    dotSpacing,
  } = useBackgroundStore();

  switch (type) {
    case "blank":
      return <BlankBackground color={color} style={style} />;
    
    case "grid":
      return (
        <GridBackground
          color={color}
          lineColor={lineColor}
          gridSize={gridSize}
          lineWidth={lineWidth}
          style={style}
        />
      );
    
    case "dotted":
      return (
        <DottedBackground
          color={color}
          dotColor={dotColor}
          dotSize={dotSize}
          dotSpacing={dotSpacing}
          style={style}
        />
      );
    
    default:
      return <BlankBackground color={color} style={style} />;
  }
}
