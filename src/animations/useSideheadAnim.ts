import { useRef } from "react";
import { Animated } from "react-native";

export function useSideheadAnim() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const triggerSideShake = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: -4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -2,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 2,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 30,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const sideheadAnim = {
    transform: [{ translateX: animatedValue }],
  };

  return { sideheadAnim, triggerSideShake };
}
