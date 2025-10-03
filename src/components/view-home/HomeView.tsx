import React from "react";
import { Animated } from "react-native";
import { useUIStore } from "../../stores/ui";
import StartWorkoutButton from "./StartWorkoutButton";
import GreetingText from "./GreetingText";

export default function HomeView() {
  const { isWorkoutView, setWorkoutView } = useUIStore();

  const homeViewOpacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isWorkoutView) {
      showWorkoutView();
    } else {
      showHomeView();
    }
  }, [isWorkoutView]);

  // Transition functions
  const showWorkoutView = () => {
    Animated.timing(homeViewOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const showHomeView = () => {
    Animated.timing(homeViewOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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

      <StartWorkoutButton onPress={() => setWorkoutView(true)} />
    </Animated.View>
  );
}
