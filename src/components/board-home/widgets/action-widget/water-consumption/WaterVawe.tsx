import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface WaterWaveProps {
  width: number; // container width
  height: number; // wave container height
  color: string; // wave color
  amplitude?: number; // vertical wave height
  speed?: number; // ms per loop
}

/**
 * Fully seamless, looping water wave for React Native
 */
export function WaterWave({
  width,
  height,
  color,
  amplitude = 16,
  speed = 1000,
}: WaterWaveProps) {
  // Shared value for horizontal translation
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-width, { duration: speed, easing: Easing.linear }),
      -1
    );
  }, [width, speed]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Single wave path — tiles perfectly horizontally
  const waveD = `
    M 0 ${amplitude}
    C ${width * 0.25} ${amplitude - amplitude},
      ${width * 0.75} ${amplitude + amplitude},
      ${width} ${amplitude}
    L ${width} ${height}
    L 0 ${height}
    Z
  `;

  return (
    <View style={{ width, height, overflow: "hidden" }}>
      <Animated.View
        style={[{ flexDirection: "row", width: width * 2 }, animatedStyle]}
      >
        {/* Two copies for seamless looping */}
        <Svg width={width} height={height}>
          <Path fill={color} d={waveD} />
        </Svg>
        <Svg width={width} height={height}>
          <Path fill={color} d={waveD} />
        </Svg>
      </Animated.View>
    </View>
  );
}
