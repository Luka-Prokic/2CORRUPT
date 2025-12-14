import { useMemo } from "react";
import { SegmentWeight } from "./types";

const segmentWeightMap: Record<SegmentWeight, number> = {
  "ultra-thin": 222,
  "extra-thin": 7,
  thin: 6,
  normal: 5,
  "semi-bold": 4.5,
  bold: 4,
  "extra-bold": 3,
  "ultra-bold": 2,
};

interface UseThicknessProps {
  size: number;
  weight?: SegmentWeight;
  thickness?: number;
}

export function useThickness({
  size,
  weight = "normal",
  thickness,
}: UseThicknessProps): number {
  return useMemo(() => {
    // 1. Pick base thickness
    const baseThickness =
      thickness ?? Math.round(size / segmentWeightMap[weight]);

    // 2. Ensure odd number
    return baseThickness % 2 === 0 ? baseThickness + 1 : baseThickness;
  }, [size, weight, thickness]);
}
