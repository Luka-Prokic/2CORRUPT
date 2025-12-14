import React from "react";
import { SegmentEight, SegmentEightProps } from "./SegmentEight";
import { SegmentWeight } from "./types";

interface SegmentDigitProps {
  digit?: number; // 0-9
  eightOptions?: SegmentEightProps;
  color?: string;
  activeOpacity?: number;
  inactiveOpacity?: number;
  weight?: SegmentWeight;
}

const digitMap: Record<number, number[]> = {
  0: [1, 1, 1, 0, 1, 1, 1],
  1: [0, 0, 1, 0, 0, 1, 0],
  2: [1, 0, 1, 1, 1, 0, 1],
  3: [1, 0, 1, 1, 0, 1, 1],
  4: [0, 1, 1, 1, 0, 1, 0],
  5: [1, 1, 0, 1, 0, 1, 1],
  6: [1, 1, 0, 1, 1, 1, 1],
  7: [1, 0, 1, 0, 0, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

export function SegmentDigit({
  digit = 8,
  eightOptions,
  color,
  activeOpacity = 1,
  inactiveOpacity = 0.1,
  weight = "normal",
}: SegmentDigitProps) {
  const baseActiveSegments = digitMap[digit] || digitMap[8];

  // convert 0/1 to inactive/active opacity
  const activeSegments = baseActiveSegments.map((v) =>
    v ? activeOpacity : inactiveOpacity
  );

  return (
    <SegmentEight
      {...eightOptions}
      activeSegments={activeSegments}
      color={color || eightOptions?.color || "white"}
      segmentOptions={{
        ...(eightOptions?.segmentOptions || {}),
        color: color || eightOptions?.segmentOptions?.color || "white",
      }}
      weight={weight}
    />
  );
}
