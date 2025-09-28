import React from "react";
import { View, Animated } from "react-native";
import { useThemeStore } from "../stores/themeStore";
import Colors from "../config/constants/Colors";
import StashButton from "../components/stash/StashButton";
import useFadeInAnim from "../animations/useFadeInAnim";

export default function HomeScreen() {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
  const { fadeIn } = useFadeInAnim(true);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Animated.View style={[{ flex: 1 }, fadeIn]}>
        
        <StashButton />
      </Animated.View>
    </View>
  );
}
