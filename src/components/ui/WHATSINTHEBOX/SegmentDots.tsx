import React from "react";
import Svg, { Circle } from "react-native-svg";
import { View } from "react-native";
import { SegmentWeight } from "./types";
import { useThickness } from "./useThickness";

interface SegmentDotsProps {
  size?: number; // total height of colon
  dotRadius?: number; // radius of each dot
  color?: string;
  activeOpacity?: number;
  inactiveOpacity?: number;
  active?: boolean;
  weight?: SegmentWeight;
}

export function SegmentDots({
  size = 44,
  dotRadius,
  color = "white",
  activeOpacity = 1,
  inactiveOpacity = 0.1,
  active = true,
  weight = "normal",
}: SegmentDotsProps) {
  const opacity = active ? activeOpacity : inactiveOpacity;

  const dotThickness = useThickness({ size, weight, thickness: dotRadius });

  return (
    <View
      style={{
        width: dotThickness * 2,
        height: size * 2,
        paddingVertical: (size - dotThickness) / 2,
        justifyContent: "space-between",
        alignItems: "center",
        opacity,
      }}
    >
      <Svg width={dotThickness} height={dotThickness}>
        <Circle
          cx={dotThickness / 2}
          cy={dotThickness / 2}
          r={dotThickness / 2}
          fill={color}
        />
      </Svg>
      <Svg width={dotThickness} height={dotThickness}>
        <Circle
          cx={dotThickness / 2}
          cy={dotThickness / 2}
          r={dotThickness / 2}
          fill={color}
        />
      </Svg>
    </View>
  );
}
