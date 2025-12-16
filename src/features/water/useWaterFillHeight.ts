import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

interface UseWaterFillHeightParams {
  consumedLiters: number;
  goalLiters: number;
  containerHeight: number;
}

export function useWaterFillHeight({
  consumedLiters,
  goalLiters,
  containerHeight,
}: UseWaterFillHeightParams) {
  const progress =
    goalLiters <= 0 || consumedLiters <= 0
      ? 0
      : Math.min(consumedLiters / goalLiters, 1);

  const fillHeight = progress * containerHeight;

  return {
    progress, // 0 → 1 (for animations, opacity, etc.)
    fillHeight, // 0 → containerHeight (for View height)
  };
}

interface UseAnimatedWaterFillHeightParams {
  consumedLiters: number;
  goalLiters: number;
  containerHeight: number;
  duration?: number;
}

export function useAnimatedWaterFillHeight({
  consumedLiters,
  goalLiters,
  containerHeight,
  duration = 200,
}: UseAnimatedWaterFillHeightParams) {
  // progress 0 → 1
  const progress =
    goalLiters <= 0 || consumedLiters <= 0
      ? 0
      : Math.min(consumedLiters / goalLiters, 1);

  // shared value for animation
  const animatedFillHeight = useSharedValue(progress * containerHeight);

  // whenever progress changes, animate the shared value
  useEffect(() => {
    animatedFillHeight.value = withTiming(progress * containerHeight, {
      duration,
    });
  }, [progress, containerHeight]);

  return {
    progress,
    animatedFillHeight,
  };
}
