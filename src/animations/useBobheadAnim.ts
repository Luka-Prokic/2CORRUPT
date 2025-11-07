import { useRef } from "react";
import { Animated } from "react-native";

export function useBobheadAnim() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
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

  const bobheadAnim = {
    transform: [{ translateY: animatedValue }],
  };

  return { bobheadAnim, triggerShake };
}
