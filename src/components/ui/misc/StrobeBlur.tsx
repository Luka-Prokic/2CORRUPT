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
  disabled?: boolean;
}

const BLOBS = [0, 1, 2, 3, 0, 1, 2, 3];

export function StrobeBlur({
  style,
  colors,
  duration = 6000,
  children,
  tint = "default",
  size = 100,
  disabled = false,
}: StrobeBlurProps) {
  const { themeMode } = useSettingsStore();
  const animValues = useRef(BLOBS.map(() => new Animated.Value(0))).current;

  // Randomize ONLY the path/shape
  const blobSettings = useMemo(
    () =>
      BLOBS.map((i: number) => ({
        color: i,
        offset: Math.random(), // start point of motion
        radius: 50 + Math.random() * size, // how far they travel
        size: size + Math.random() * 60, // blob size
        borderRadius: {
          borderTopLeftRadius: size / 2.5 + (Math.random() * size) / 2,
          borderTopRightRadius: size / 2.5 + (Math.random() * size) / 2,
          borderBottomLeftRadius: size / 2.5 + (Math.random() * size) / 2,
          borderBottomRightRadius: size / 2.5 + (Math.random() * size) / 2,
        },
      })),
    []
  );

  // Animate all with the same speed
  useEffect(() => {
    animValues.forEach((val, i) => {
      val.setValue(blobSettings[i].offset);
      Animated.loop(
        Animated.timing(val, {
          toValue: 1 + blobSettings[i].offset,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
          isInteraction: false,
        })
      ).start();
    });
  }, [blobSettings]);

  function renderBlobs() {
    return blobSettings.map((blob, i) => {
      const { radius, size, borderRadius } = blob;

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
          key={`blob-${i}`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            backgroundColor: colors[blob.color],
            opacity: 0.2,
            transform: [
              {
                translateX: Animated.add(
                  translateX,
                  new Animated.Value(
                    i % 2 === 0 ? WIDTH / 2 - size / 2 : size / 2
                  )
                ),
              },
              { translateY },
            ],
            ...borderRadius,
          }}
        />
      );
    });
  }

  if (disabled) {
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
    <View style={[style, { overflow: "hidden" }]}>
      {renderBlobs()}
      <BlurView
        intensity={100}
        tint={tint === "auto" ? themeMode : tint}
        style={[
          StyleSheet.absoluteFill,
          {
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}
