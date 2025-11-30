import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useBounceScaleAnim() {
  const scale = useSharedValue(1);

  function bounceIt() {
    scale.value = withTiming(0.8, { duration: 40 }, (finished) => {
      if (finished) {
        scale.value = withSpring(1, {
          mass: 0.5,
          damping: 8,
          stiffness: 150,
          overshootClamping: false,
        });
      }
    });
  }

  const bounceAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    bounceAnim,
    bounceIt,
  };
}
