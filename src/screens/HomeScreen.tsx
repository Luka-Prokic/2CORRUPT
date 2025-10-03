import React, { useState } from "react";
import { Animated, View, Dimensions } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import Colors from "../config/constants/Colors";
import StashButton from "../components/board-home/StashButton";
import GreetingText from "../components/home-screen/GreetingText";
import StartWorkoutButton from "../components/home-screen/StartWorkoutButton";
import WorkoutView from "../components/home-screen/WorkoutView";
import useFadeInAnim from "../animations/useFadeInAnim";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const HEIGHT = Dimensions.get("window").height;

export default function HomeScreen() {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];
  const { fadeIn } = useFadeInAnim(true);

  // State for view switching
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  // Animation values for transitions
  const workoutViewOpacity = React.useRef(new Animated.Value(0)).current;
  const homeViewOpacity = React.useRef(new Animated.Value(1)).current;

  // Button animations
  const startButtonOpacity = React.useRef(new Animated.Value(1)).current;
  const stashButtonBottom = React.useRef(
    new Animated.Value(HEIGHT / 2 - 136)
  ).current; // Start below center (8 units below start button)

  // Transition functions
  const showWorkoutView = () => {
    setIsWorkoutActive(true);
    Animated.parallel([
      // View transitions
      Animated.timing(homeViewOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(workoutViewOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // StartWorkoutButton animations
      Animated.timing(startButtonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // StashButton animation
      Animated.spring(stashButtonBottom, {
        toValue: 22, // Slide to bottom with padding
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const showHomeView = () => {
    Animated.parallel([
      // View transitions
      Animated.timing(homeViewOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(workoutViewOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // StartWorkoutButton animations
      Animated.timing(startButtonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // StashButton animation
      Animated.spring(stashButtonBottom, {
        toValue: HEIGHT / 2 - 136, // Move back up below center
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsWorkoutActive(false);
    });
  };

  const navigation = useNavigation();

  const handlePress = () => {
    if (isWorkoutActive) {
      navigation.navigate("WorkoutBoard" as never);
    } else {
      navigation.navigate("Stash" as never);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background, flex: 1 }}
    >
      <View style={{ flex: 1, position: "relative" }}>
        {/* Home View - Only GreetingText */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 100,
            },
            fadeIn,
            { opacity: homeViewOpacity },
          ]}
        >
          <GreetingText />
        </Animated.View>

        {/* Workout View */}
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
          <WorkoutView onBackPress={showHomeView} />
        </Animated.View>

        {/* StartWorkoutButton - Absolute positioned */}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              zIndex: 5,
            },
            {
              bottom: HEIGHT / 2 - 64,
              opacity: startButtonOpacity,
            },
          ]}
        >
          <StartWorkoutButton onPress={showWorkoutView} />
        </Animated.View>

        {/* StashButton - Absolute positioned */}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              alignItems: "center",
              paddingHorizontal: 16,
              zIndex: 10,
            },
            {
              bottom: stashButtonBottom,
            },
          ]}
        >
          <StashButton onPress={handlePress} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
