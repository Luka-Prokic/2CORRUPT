import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useSmoothHeightAnim(isExpanded: boolean, snapPoints: [number, number], duration = 300) {
  const animatedHeight = useRef(new Animated.Value(snapPoints[0])).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? snapPoints[1] : snapPoints[0],
      duration,
      useNativeDriver: false, // height animation must be false
    }).start();
  }, [isExpanded, snapPoints, duration]);

  const animatedStyle = {
    height: animatedHeight,
  };

  return { animatedStyle };
}