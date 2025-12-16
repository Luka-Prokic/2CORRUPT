import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

interface UseWaterFillHeightParams {
  waterConsumption: number; //ml
  dailyWaterGoal: number; //ml
  containerHeight: number;
}

export function useWaterFillHeight({
  waterConsumption,
  dailyWaterGoal,
  containerHeight,
}: UseWaterFillHeightParams) {
  const progress =
    dailyWaterGoal <= 0 || waterConsumption <= 0
      ? 0
      : Math.min(waterConsumption / dailyWaterGoal, 1);

  const fillHeight = progress * containerHeight;

  return {
    progress, // 0 → 1 (for animations, opacity, etc.)
    fillHeight, // 0 → containerHeight (for View height)
  };
}

interface UseAnimatedWaterFillHeightParams {
  waterConsumption: number;
  dailyWaterGoal: number;
  containerHeight: number;
  duration?: number;
}

export function useAnimatedWaterFillHeight({
  waterConsumption,
  dailyWaterGoal,
  containerHeight,
  duration = 200,
}: UseAnimatedWaterFillHeightParams) {
  // progress 0 → 1
  const progress =
    dailyWaterGoal <= 0 || waterConsumption <= 0
      ? 0
      : Math.min(waterConsumption / dailyWaterGoal, 1);

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
