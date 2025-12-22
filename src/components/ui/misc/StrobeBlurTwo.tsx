import { BlurView } from "expo-blur";
import { useEffect, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Shine } from "./Shine";
import { useSettingsStore } from "../../../stores/settingsStore";

export type StrobeColors = [string, string, string, string];
export interface StrobeBlurProps {
  style?: ViewStyle | ViewStyle[];
  styleContent?: ViewStyle | ViewStyle[];
  colors?: StrobeColors;
  duration?: number;
  children?: React.ReactNode;
  tint?: "default" | "light" | "dark" | "auto";
  size?: number;
  disabled?: boolean;
  freeze?: boolean;
  strobeColor?: string;
  noShine?: boolean;
}

const BLOBS = [0, 1, 2, 3, 0, 1, 2, 3];

export function StrobeBlurTwo({
  style,
  colors = ["#fff", "#fff", "#fff", "#fff"],
  duration = 500,
  styleContent,
  children,
  tint = "default",
  size = 100,
  disabled = false,
  freeze = false,
  strobeColor,
  noShine = false,
}: StrobeBlurProps) {
  const { themeMode } = useSettingsStore();

  const toggle = useSharedValue(false);

  useEffect(() => {
    const interval = setInterval(() => {
      toggle.value = !toggle.value;
    }, duration);
    return () => clearInterval(interval);
  }, [toggle, duration]);

  const blobSettings = useMemo(() => {
    return BLOBS.map((blob) => {
      const r = Math.random();
      return {
        color: colors[blob],
        radius: 50 + r * size,
        size: size + r * 60,
        borderRadius: {
          borderTopLeftRadius: size / 2 + (r * size) / 2,
          borderTopRightRadius: size / 2 + (r * size) / 2,
          borderBottomLeftRadius: size / 2 + (r * size) / 2,
          borderBottomRightRadius: size / 2 + (r * size) / 2,
        },
      };
    });
  }, [colors, size]);

  if (disabled) {
    return (
      <View
        style={[
          {
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            ...styleContent,
          },
          style,
        ]}
      >
        {!noShine && <Shine style={{ borderRadius: 0 }} />}
        {children}
      </View>
    );
  }

  return (
    <View
      style={[{ width: "100%", height: "100%", overflow: "hidden" }, style]}
    >
      {blobSettings.map((blob, i) => {
        // one useAnimatedStyle per transform property
        const animatedStyleX = useAnimatedStyle(() => ({
          transform: [
            {
              translateX: withTiming(toggle.value ? blob.radius : 0, {
                duration,
              }),
            },
          ],
        }));

        const animatedStyleY = useAnimatedStyle(() => ({
          transform: [
            {
              translateY: withTiming(
                toggle.value ? -blob.radius : blob.radius,
                { duration }
              ),
            },
          ],
        }));

        return (
          <Animated.View
            key={i}
            style={[
              {
                position: "absolute",
                width: blob.size,
                height: blob.size,
                backgroundColor: strobeColor ?? blob.color,
                opacity: 0.2,
              },
              blob.borderRadius,
              animatedStyleX,
              animatedStyleY,
            ]}
          />
        );
      })}
      <BlurView
        intensity={0}
        tint={tint === "auto" ? themeMode : tint}
        style={[
          StyleSheet.absoluteFill,
          {
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            ...styleContent,
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}
