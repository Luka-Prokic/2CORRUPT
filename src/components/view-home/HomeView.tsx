import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { useUIStore } from "../../stores/ui";
import { StartWorkoutButton } from "./StartWorkoutButton";
import { GreetingText } from "./GreetingText";

export function HomeView() {
  const { isWorkoutView } = useUIStore();

  const homeViewOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isWorkoutView) {
      Animated.timing(homeViewOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(homeViewOpacity, {
        toValue: 1,
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
          justifyContent: "flex-start",
        },
        { opacity: homeViewOpacity },
      ]}
    >
      <GreetingText />

      <StartWorkoutButton />
    </Animated.View>
  );
}
