import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ExerciseTableHeader as HeaderContent } from "./ExerciseTableHeader";
import { useWorkoutStore } from "../../../../stores/workoutStore";

export function SlideableExerciseHeader() {
  const { activeExercise } = useWorkoutStore();
  const translateX = useSharedValue(0);

  useEffect(() => {
    // slide left then back to center on exercise change
    translateX.value = withSequence(
      withTiming(-40, { duration: 150 }),
      withTiming(0, { duration: 250 })
    );
  }, [activeExercise?.id]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <HeaderContent />
    </Animated.View>
  );
}
