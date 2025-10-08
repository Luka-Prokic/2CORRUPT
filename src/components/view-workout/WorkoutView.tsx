import { useRef, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { WorkoutScreenMockup } from "../board-workout/mockups/WorkoutScreenMockup";
import { useUIStore } from "../../stores/ui";

export function WorkoutView() {
  const { theme } = useSettingsStore();
  const { setWorkoutView, isWorkoutView } = useUIStore();

  const workoutViewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isWorkoutView) {
      Animated.timing(workoutViewOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(workoutViewOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isWorkoutView]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        { opacity: workoutViewOpacity },
      ]}
    >
      <WorkoutScreenMockup />
    </Animated.View>
  );
}
