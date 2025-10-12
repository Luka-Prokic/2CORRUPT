import { useRef, useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workoutStore";
import { ExerciseListView } from "./ExerciseListView";
import { NoExerciseView } from "./NoExerciseView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UIView } from "../ui/UIView";

export function WorkoutView() {
  const { activeSession, activeExercise } = useWorkoutStore();

  const content = !activeExercise ? (
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
  ) : (
    <ExerciseListView />
  );

  return (
    <UIView type="workout">
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HEIGHT - 162,
            width: WIDTH,
          },
        ]}
      >
        {content}
      </View>
    </UIView>
  );
}
