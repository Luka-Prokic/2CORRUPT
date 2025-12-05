import { useEffect, useRef, useMemo } from "react";
import { View, Animated, ViewStyle, StyleSheet, Easing } from "react-native";
import { BlurView } from "expo-blur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";

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
  freeze?: boolean; // <-- new prop
}

const BLOBS = [0, 1, 2, 3, 0, 1, 2, 3];

export function StrobeBlur({
  style,
  colors = ["#fff", "#fff", "#fff", "#fff"],
  duration = 6000,
  styleContent,
  children,
  tint = "default",
  size = 100,
  disabled = false,
  freeze = false,
}: StrobeBlurProps) {
  const { themeMode } = useSettingsStore();
  const animValues = useRef(BLOBS.map(() => new Animated.Value(0))).current;

  // Randomize ONLY the path/shape
  const blobSettings = useMemo(() => {
    return BLOBS.map((blob: number) => {
      const r = Math.random(); // generate per blob
      return {
        color: blob,
        offset: r,
        radius: 50 + r * size,
        size: size + r * 60,
        borderRadius: {
          borderTopLeftRadius: size / 2 + (r * size) / 2,
          borderTopRightRadius: size / 2 + (r * size) / 2,
          borderBottomLeftRadius: size / 2 + (r * size) / 2,
          borderBottomRightRadius: size / 2 + (r * size) / 2,
        },
        frozenPosition: r,
      };
    });
  }, [size]);

  useEffect(() => {
    if (freeze) {
      // Immediately set each blob to a random frozen position
      animValues.forEach((val, i) => {
        val.setValue(blobSettings[i].frozenPosition);
      });
      return; // stop the animation
    }

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
  }, [blobSettings, freeze]);

  function renderBlobs() {
    return blobSettings.map((blob, i) => {
      const { radius, size, borderRadius } = blob;

      const translateX = animValues[blob.color].interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        outputRange: [0, radius, 0, -radius, 0, radius, 0, -radius, 0],
      });

      const translateY = animValues[blob.color].interpolate({
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
            backgroundColor: colors?.[blob.color] ?? "rgba(255,255,255,0.2)",
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
            ...styleContent,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      style={{ width: "100%", height: "100%", overflow: "hidden", ...style }}
    >
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
            ...styleContent,
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}
