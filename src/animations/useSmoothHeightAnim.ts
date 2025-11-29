import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface UseSmoothHeightAnimProps {
  isExpanded: boolean;
  snapPoints: [number, number];
  duration?: number;
}

export function useSmoothHeightAnim({
  isExpanded,
  snapPoints,
  duration = 300,
}: UseSmoothHeightAnimProps) {
  const height = useSharedValue(snapPoints[0]);

  useEffect(() => {
    height.value = withTiming(isExpanded ? snapPoints[1] : snapPoints[0], {
      duration,
    });
  }, [isExpanded, snapPoints, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return { animatedStyle, height };
}
