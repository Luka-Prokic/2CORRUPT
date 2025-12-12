import { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { frameMap } from "./frameMap"; // your require map

interface FrameAnimationProps {
  fps?: number;
  model: string;
  width?: number;
  height?: number;
}

export function FrameAnimation({
  fps = 60,
  model,
  width = 200,
  height = 200,
}: FrameAnimationProps) {
  const frames = frameMap[model];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const frameTime = 1000 / fps;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, frameTime);

    return () => clearInterval(intervalRef.current!);
  }, [fps, frames.length]);

  return (
    <View style={{ width, height }}>
      {frames.map((src: any, i: number) => (
        <Image
          key={i}
          source={src}
          style={[
            StyleSheet.absoluteFill,
            {
              width,
              height,
              resizeMode: "contain",
              opacity: i === index ? 1 : 0,
            },
          ]}
        />
      ))}
    </View>
  );
}
