import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import { Canvas } from "@react-three/fiber";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSettingsStore } from "../../../stores/settingsStore";
import WidgetContainer from "./WidgetContainer";
import hexToRGBA from "../../../features/HEXtoRGB";
import BounceButton from "../../ui/buttons/BounceButton";

interface ThreeDWidgetProps {
  children: ReactNode;
  width?: number;
  height?: number;
  variant?: "default" | "compact" | "detailed" | "expanded";
  elevation?: number;
}

// Lighting Component for 3D scenes
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
}

export default function ThreeDWidget({
  children,
  width = 150,
  height = 150,
  variant = "default",
  elevation = 2,
}: ThreeDWidgetProps) {
  const { theme } = useSettingsStore();

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "compact":
        return styles.compact;
      case "detailed":
        return styles.detailed;
      case "expanded":
        return styles.expanded;
      case "default":
      default:
        return styles.default;
    }
  };

  return (
    <WidgetContainer
      style={[
        getVariantStyle(),
        {
          width,
          height,
          shadowColor: theme.shadow,
          elevation: elevation,
          backgroundColor: "transparent",
          borderColor: "transparent",
          padding: 0,
          overflow: "visible",
        },
      ]}
      variant="inset"
    >
      <LinearGradient
        colors={[
          "transparent",
          "transparent",
          hexToRGBA(theme.tint, 0.2),
          "transparent",
        ]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.9 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BounceButton
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
          onPress={() => {}}
        >
          <Canvas
            camera={{ position: [0, 0, 3], fov: 60 }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <SceneLights />
            {children}
          </Canvas>
          <BlurView
            intensity={10}
            tint="light"
            style={{
              position: "absolute",
              bottom: 2,
              left: 0,
              right: 0,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
              // borderTopWidth: 0,
              borderRadius: 22,
              height: 44,
            }}
          >
            <LinearGradient
              colors={[
                hexToRGBA(theme.text, 0),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0),
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.caka,
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                CREATINE
              </Text>
              <Text
                style={{
                  color: theme.secondaryText,
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                30 days streak!
              </Text>
            </LinearGradient>
          </BlurView>
        </BounceButton>
      </LinearGradient>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  default: {
    padding: 16,
  },
  compact: {
    padding: 8,
  },
  detailed: {
    padding: 20,
  },
  expanded: {
    padding: 24,
  },
});
