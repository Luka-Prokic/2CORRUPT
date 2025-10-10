import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { HEIGHT } from "../../features/Dimensions";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workoutStore";
import { ExerciseListView } from "./ExerciseListView";
import { NoSessionView } from "./NoSessionView";
import { NoExerciseView } from "./NoExerciseView";

export function WorkoutView() {
  const { isWorkoutView } = useUIStore();
  const { activeSession, activeExercise, startSession } = useWorkoutStore();

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

  useEffect(() => {
    if (!activeSession) {
      startSession();
    }
  }, [activeSession]);

  const content = !activeSession ? (
    <NoSessionView />
  ) : !activeExercise ? (
    <NoExerciseView />
  ) : (
    <ExerciseListView />
  );

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEIGHT - 162,
          width: "100%",
        },
        { opacity: workoutViewOpacity },
      ]}
    >
      {content}
    </Animated.View>
  );
}
