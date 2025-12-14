import React from "react";
import Svg, { Polygon } from "react-native-svg";

export interface SegmentProps {
  length?: number; // long side
  thickness?: number; // thickness of segment
  color?: string;
  opacity?: number;
}

// Vertical segment: top/bottom triangles are 90deg
export function VerticalSegment({
  length = 88,
  thickness = 11,
  color = "red",
  opacity = 1,
}: SegmentProps) {
  const w = thickness; // vertical width
  const h = length;
  const t = thickness / 2; // triangle tip size

  const points = [
    [w / 2, 0], // top tip
    [w, t], // top-right
    [w, h - t], // bottom-right
    [w / 2, h], // bottom tip
    [0, h - t], // bottom-left
    [0, t], // top-left
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <Svg width={w} height={h}>
      <Polygon points={points} fill={color} opacity={opacity} />
    </Svg>
  );
}

// Horizontal segment: left/right triangles are 90deg
export function HorizontalSegment({
  length,
  thickness,
  color = "red",
  opacity = 1,
}: SegmentProps) {
  const w = length;
  const h = thickness;
  const t = thickness / 2; // triangle tip size

  const points = [
    [0, h / 2], // left tip
    [t, 0], // top-left
    [w - t, 0], // top-right
    [w, h / 2], // right tip
    [w - t, h], // bottom-right
    [t, h], // bottom-left
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <Svg width={w} height={h}>
      <Polygon points={points} fill={color} opacity={opacity} />
    </Svg>
  );
}
