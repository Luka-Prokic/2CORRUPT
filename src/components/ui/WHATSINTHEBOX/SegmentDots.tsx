import React from "react";
import Svg, { Circle } from "react-native-svg";
import { View } from "react-native";

interface SegmentDotsProps {
  size?: number; // total height of colon
  dotRadius?: number; // radius of each dot
  color?: string;
  activeOpacity?: number;
  inactiveOpacity?: number;
  active?: boolean;
}

export function SegmentDots({
  size = 44,
  dotRadius = 4,
  color = "white",
  activeOpacity = 1,
  inactiveOpacity = 0.1,
  active = true,
}: SegmentDotsProps) {
  const opacity = active ? activeOpacity : inactiveOpacity;

  return (
    <View
      style={{
        width: dotRadius * 2,
        height: size,
        justifyContent: "space-between",
        alignItems: "center",
        opacity,
      }}
    >
      <Svg width={dotRadius * 2} height={dotRadius * 2}>
        <Circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill={color} />
      </Svg>
      <Svg width={dotRadius * 2} height={dotRadius * 2}>
        <Circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill={color} />
      </Svg>
    </View>
  );
}
