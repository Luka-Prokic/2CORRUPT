import React, { useRef, useEffect } from "react";
import { ViewStyle, Animated, Easing, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "../../../stores/settingsStore";
import hexToRGBA from "../../../features/HEXtoRGB";

interface AnimatedLinearGradientBoxProps {
  style?: ViewStyle;
  duration?: number; // rotation duration in ms
  children?: React.ReactNode;
}

export default function AnimatedLinearGradientBox({
  style,
  duration = 4000,
  children,
}: AnimatedLinearGradientBoxProps) {
  const { theme } = useSettingsStore();
  const progress = useRef(new Animated.Value(0)).current;

  // Gradient color tuple (static)
  const colors: [string, string, string, string, string] = [
    hexToRGBA(theme.text, 0.1),
    hexToRGBA(theme.primaryBackground, 0.1),
    hexToRGBA(theme.text, 0.3),
    hexToRGBA(theme.tint, 0.3),
    hexToRGBA(theme.text, 0),
  ];

  // Animate progress 0 → 1 → 0 infinitely
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: false, // cannot animate 'start'/'end' with native driver
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [duration]);

  // Interpolate start & end points
  const startX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // 0 → 1
  });
  const startY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const endX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const endY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View
      style={[
        {
          marginTop: 16,
          padding: 16,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject, borderRadius: 24 }}
      />
      {children}
    </Animated.View>
  );
}