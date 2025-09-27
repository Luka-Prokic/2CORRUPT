import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useRotateAnimation(active: boolean, duration: number = 300) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: active ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [active, duration, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return {
    rotateStyle: { transform: [{ rotate: rotateInterpolate }] },
  };
}