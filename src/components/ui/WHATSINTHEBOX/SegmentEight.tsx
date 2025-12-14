import React from "react";
import { View } from "react-native";
import { HorizontalSegment, SegmentProps, VerticalSegment } from "./Segment";
import { useThickness } from "./useThickness";
import { SegmentWeight } from "./types";

const defaultSegmentOptions: SegmentProps = {
  thickness: undefined,
  length: undefined,
};

const defaultActiveSegments: number[] = [1, 1, 1, 1, 1, 1, 1];

export interface SegmentEightProps {
  size?: number;
  color?: string;
  segmentOptions?: SegmentProps;
  gap?: number;
  activeSegments?: number[];
  weight?: SegmentWeight;
}

export function SegmentEight({
  size = 44,
  color = "white",
  segmentOptions = defaultSegmentOptions,
  gap,
  activeSegments = defaultActiveSegments,
  weight = "normal",
}: SegmentEightProps) {
  const thickness = useThickness({
    size,
    weight,
    thickness: segmentOptions.thickness,
  });
  const length = segmentOptions.length ?? size - thickness;

  const segmentGap = gap ?? (size > 44 ? 2 : 1);

  return (
    <View
      style={{
        width: size + 2 * segmentGap,
        height: size * 2 - thickness + 4 * segmentGap,
      }}
    >
      {/* Top segment */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingHorizontal: thickness / 2 + segmentGap,
        }}
      >
        <HorizontalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[0]}
        />
      </View>

      {/* Upper verticals */}
      <View
        style={{
          position: "absolute",
          top: thickness / 2 + segmentGap,
          left: 0,
          right: 0,
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <VerticalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[1]}
        />
        <VerticalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[2]}
        />
      </View>

      {/* Middle segment */}
      <View
        style={{
          position: "absolute",
          top: size - thickness + 2 * segmentGap,
          left: 0,
          right: 0,
          paddingHorizontal: thickness / 2 + segmentGap,
        }}
      >
        <HorizontalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[3]}
        />
      </View>

      {/* Lower verticals */}
      <View
        style={{
          position: "absolute",
          bottom: thickness / 2 + segmentGap,
          left: 0,
          right: 0,
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <VerticalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[4]}
        />
        <VerticalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[5]}
        />
      </View>

      {/* Bottom segment */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: thickness / 2 + segmentGap,
        }}
      >
        <HorizontalSegment
          length={length}
          thickness={thickness}
          color={color || segmentOptions.color}
          opacity={activeSegments[6]}
        />
      </View>
    </View>
  );
}
