import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workoutStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NoExerciseView } from "../view-workout/NoExerciseView";

export function TemplateView() {
  const { typeOfView } = useUIStore();
  const { activeSession, activeExercise, startSession } = useWorkoutStore();

  const workoutViewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (typeOfView === "template") {
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
  }, [typeOfView]);

  useEffect(() => {
    if (!activeSession) {
      startSession();
    }
  }, [activeSession]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEIGHT - 162,
          width: WIDTH,
        },
        { opacity: workoutViewOpacity },
      ]}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        enableOnAndroid
        enableAutomaticScroll={true}
        extraScrollHeight={0}
        keyboardOpeningTime={0}
        scrollEnabled={false}
      >
        <NoExerciseView />
      </KeyboardAwareScrollView>
    </Animated.View>
  );
}
