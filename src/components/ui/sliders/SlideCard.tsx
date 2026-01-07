import { memo } from "react";
import { Animated as RNAnimated } from "react-native";

type AnimationType = "card" | "wheel" | "album" | "flat";

interface SlideCardProps {
  scrollX: RNAnimated.Value;
  index: number;
  content: React.ReactNode;
  width: number;
  height: number;
  totalItems: number;
  horizontalPadding: number;
  animationType?: AnimationType;
}

export const memoizedSlideCard = memo(SlideCard);

export function SlideCard({
  scrollX,
  index,
  content,
  width,
  height,
  animationType = "card",
}: SlideCardProps) {
  const inputRange = [
    (index - 3) * width,
    (index - 2) * width,
    (index - 1) * width,
    index * width,
    (index + 1) * width,
    (index + 2) * width,
    (index + 3) * width,
  ];

  const opacity =
    animationType === "flat"
      ? 1
      : scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4],
          extrapolate: "clamp",
        });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 0.9, 0.95, 1, 0.95, 0.9, 0.85],
    extrapolate: "clamp",
  });

  const rotateY =
    animationType === "flat"
      ? scrollX.interpolate({
          inputRange,
          outputRange: ["0deg", "0deg", "0deg", "0deg", "0deg", "0deg", "0deg"],
          extrapolate: "clamp",
        })
      : animationType === "card"
      ? scrollX.interpolate({
          inputRange,
          outputRange: [
            "-65deg",
            "-35deg",
            "-25deg",
            "0deg",
            "25deg",
            "35deg",
            "65deg",
          ],
          extrapolate: "clamp",
        })
      : animationType === "wheel"
      ? scrollX.interpolate({
          inputRange,
          outputRange: [
            "55deg",
            "45deg",
            "35deg",
            "0deg",
            "-35deg",
            "-45deg",
            "-55deg",
          ],
          extrapolate: "clamp",
        })
      : animationType === "album"
      ? scrollX.interpolate({
          inputRange,
          outputRange: [
            "-55deg",
            "-55deg",
            "-55deg",
            "0deg",
            "55deg",
            "55deg",
            "55deg",
          ],
          extrapolate: "clamp",
        })
      : undefined;

  return (
    <RNAnimated.View
      style={{
        width,
        height,
        opacity,
        transform: [{ scale }, { perspective: 600 }, { rotateY }],
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {content}
    </RNAnimated.View>
  );
}
