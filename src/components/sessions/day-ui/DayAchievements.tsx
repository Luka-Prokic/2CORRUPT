import React from "react";
import { WIDTH } from "../../../features/Dimensions";
import { useSettingsStore } from "../../../stores/settings";
import { TriangleModel } from "../../board-home/mockups/TriangleModel";
import { View } from "react-native";
import { Canvas } from "@react-three/fiber";

export function DayAchievements() {
  const { theme } = useSettingsStore();
  function SceneLights() {
    return (
      <>
        <ambientLight intensity={1} />
        <directionalLight
          position={[2, 2, 2]}
          intensity={0.8}
          color={theme.tint}
        />
        <directionalLight
          position={[-2, -2, -2]}
          intensity={0.8}
          color={theme.tint}
        />
      </>
    );
  }

  return (
    <View style={{ width: WIDTH * 0.2, height: WIDTH * 0.2 }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SceneLights />
        <TriangleModel
          color={theme.fifthBackground}
          size={1.5}
          rotationSpeed={1}
          onClick={() => {}}
        />
      </Canvas>
    </View>
  );
}
