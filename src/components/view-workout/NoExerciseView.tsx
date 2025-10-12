import { useState, useEffect, useRef } from "react";
import { PlanedSessionSelect } from "./no-exercise/PlanedSessionSelect";
import { QuickStartSelect } from "./no-exercise/QuickStartSelect";
import { CreateTemplateSelect } from "./no-exercise/CreateTemplateSelect";
import { Animated } from "react-native";
import { useUIStore } from "../../stores/ui";

export type NoExerciseViewSelected =
  | "planed-session"
  | "quick-start"
  | "create-template"
  | "none";

export function NoExerciseView() {
  const [selected, setSelected] = useState<NoExerciseViewSelected>("none");
  const { typeOfView } = useUIStore();

  const blinkAnim = useRef(new Animated.Value(1)).current;

  function handleSelect(newSelected: NoExerciseViewSelected) {
    Animated.timing(blinkAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      setSelected(newSelected);

      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });
  }

  useEffect(() => {
    if (typeOfView !== "workout") {
      setSelected("none");
    }
  }, [typeOfView]);

  const opacity = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 16,
        opacity,
      }}
    >
      <PlanedSessionSelect onSelect={handleSelect} selected={selected} />
      <QuickStartSelect onSelect={handleSelect} selected={selected} />
      <CreateTemplateSelect onSelect={handleSelect} selected={selected} />
    </Animated.View>
  );
}
