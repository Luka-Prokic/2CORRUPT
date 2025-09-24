import React from "react";
import { View, StyleSheet } from "react-native";
import RotatingTriangle from "../components/3D_models/RotatingTriangle";
import SpinTriangle from "../components/3D_models/SpinTriangle";
import Cepko3DModel from "../components/3D_models/Cepko3DModel";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <RotatingTriangle size={1.5} color="yellow" rotationSpeed={0.005} />  */}
      <SpinTriangle size={1.5} color="black" idleRotationSpeed={0.005} spinSpeed={0.1} />
      {/* <Cepko3DModel /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
  },
});
