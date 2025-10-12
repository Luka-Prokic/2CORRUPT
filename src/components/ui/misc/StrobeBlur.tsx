import React, { useEffect, useRef, useMemo } from "react";
import { View, Animated, ViewStyle, StyleSheet, Easing } from "react-native";
import { BlurView } from "expo-blur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";

interface StrobeBlurProps {
  style?: ViewStyle;
  colors?: [string, string, string, string];
  duration?: number;
  children?: React.ReactNode;
  tint?: "default" | "light" | "dark" | "auto";
  size?: number;
  disable?: boolean;
}

export function StrobeBlur({
  style,
  colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"],
  duration = 6000,
  children,
  tint = "default",
  size = 100,
  disable = false,
}: StrobeBlurProps) {
  const { themeName } = useSettingsStore();
  const animValues = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0))
  ).current;

  // Randomize ONLY the path/shape
  const blobSettings = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        offset: Math.random(), // start point of motion
        radius: 50 + Math.random() * size, // how far they travel
        size: size + Math.random() * 60, // blob size
        borderRadii: {
          borderTopLeftRadius: size / 2.5 + Math.random() * 40,
          borderTopRightRadius: size / 2.5 + Math.random() * 40,
          borderBottomLeftRadius: size / 2.5 + Math.random() * 40,
          borderBottomRightRadius: size / 2.5 + Math.random() * 40,
        },
      })),
    []
  );

  // Animate all with the same speed
  useEffect(() => {
    animValues.forEach((anim, i) => {
      anim.setValue(blobSettings[i].offset);
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1 + blobSettings[i].offset,
          duration,
          easing: Easing.linear, // smooth continuous
          useNativeDriver: true,
          isInteraction: false,
        })
      ).start();
    });
  }, []);

  const renderBlobs = (mirror = false) =>
    blobSettings.map((blob, i) => {
      const { radius, size, borderRadii } = blob;

      const translateX = animValues[i].interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        outputRange: [0, radius, 0, -radius, 0, radius, 0, -radius, 0],
      });

      const translateY = animValues[i].interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        outputRange: [-radius, 0, radius, 0, -radius, 0, radius, 0, -radius],
      });

      return (
        <Animated.View
          key={`${mirror ? "mirror" : "main"}-${i}`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            backgroundColor: colors[i],
            opacity: 0.2,
            transform: [
              {
                translateX: Animated.add(
                  translateX,
                  new Animated.Value(
                    mirror ? WIDTH / 2 - size / 2 : -WIDTH / 2 + size / 2
                  )
                ),
              },
              { translateY },
            ],
            ...borderRadii,
          }}
        />
      );
    });

  if (disable) {
    return (
      <View
        style={[
          {
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View style={[{ overflow: "hidden" }, style]}>
      {renderBlobs(false)}
      {renderBlobs(true)}
      <BlurView
        intensity={100}
        tint={
          tint === "auto"
            ? ["light", "peachy", "oldschool"].includes(themeName)
              ? "light"
              : "dark"
            : tint
        }
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}
