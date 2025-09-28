import React from "react";
import { View, Animated } from "react-native";
import RotatingTriangle from "../components/3D_models/RotatingTriangle";
import SpinTriangle from "../components/3D_models/SpinTriangle";
import { useTheme } from "../config/ThemeContext";
import StashButton from "../components/stash/StashButton";
import BackgroundManager from "../components/backgrounds/BackgroundManager";
import useFadeInAnim from "../animations/useFadeInAnim";
import BackgroundButton from "../components/background-settings/BackgroundButton";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { fadeIn } = useFadeInAnim(true);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <BackgroundManager />
      {/* <RotatingTriangle size={1.5} color="yellow" rotationSpeed={0.005} /> */}
      <Animated.View style={[{ flex: 1 }, fadeIn]}>
        <SpinTriangle
          size={1}
          color={theme.fourthBackground}
          idleRotationSpeed={0.01}
          spinSpeed={0.1}
        />
        <StashButton />
        <BackgroundButton />
      </Animated.View>
    </View>
  );
}
