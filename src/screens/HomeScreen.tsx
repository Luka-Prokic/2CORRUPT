import React from "react";
import { View, StyleSheet } from "react-native";
import RotatingTriangle from "../components/3D_models/RotatingTriangle";
import SpinTriangle from "../components/3D_models/SpinTriangle";
import { useTheme } from "../config/ThemeContext";

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* <RotatingTriangle size={1.5} color="yellow" rotationSpeed={0.005} /> */}
      <SpinTriangle
        size={1.5}
        color={theme.text}
        idleRotationSpeed={0.005}
        spinSpeed={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
