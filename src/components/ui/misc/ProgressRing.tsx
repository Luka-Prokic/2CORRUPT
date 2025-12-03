import { View, ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  compareWith: number;
  compareTo?: number;
  content?: React.ReactNode;
  ringSize?: number;
  style?: ViewStyle | ViewStyle[];
}

export function ProgressRing({
  compareWith = 0,
  compareTo = 5,
  content,
  ringSize,
  style,
}: ProgressRingProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  const size = ringSize ?? widgetUnit - 78;
  const strokeWidth = size / 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const rawProgress = compareWith / compareTo;
  const fullLoops = Math.floor(rawProgress);
  const fraction = rawProgress - fullLoops;

  const loopsArray = Array.from({ length: fullLoops + (fraction > 0 ? 1 : 0) });

  const arrowScale = useSharedValue(1);

  function pulseArrow() {
    arrowScale.value = withTiming(1.2, { duration: 100 }, () => {
      arrowScale.value = withTiming(1, { duration: 100 });
    });
  }

  return (
    <View style={{ width: size, height: size, ...style }}>
      <Svg width={size + 2} height={size + 2}>
        {/* Base ring */}
        <Circle
          stroke={theme.thirdBackground}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress loops */}
        {loopsArray.map((_, i) => {
          const isLast = i === loopsArray.length - 1;
          const color =
            i % 2 === 0 ? theme.tint : hexToRGBA(theme.secondaryText, 0.2);
          return (
            <ProgressLoop
              key={i}
              i={i}
              isLast={isLast}
              fraction={fraction}
              radius={radius}
              circumference={circumference}
              strokeWidth={strokeWidth}
              color={color}
              pulseArrow={pulseArrow}
            />
          );
        })}

        {/* Animated arrow */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: size / 2 - strokeWidth * 0.5,
            transform: [{ scale: arrowScale }],
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={strokeWidth}
            color={theme.secondaryText}
          />
        </Animated.View>
      </Svg>

      {/* Content */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          padding: radius * 0.7,
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </View>
    </View>
  );
}

/* ---------------------------------------
   ProgressLoop subcomponent (inside same file)
---------------------------------------- */
interface ProgressLoopProps {
  i: number;
  isLast: boolean;
  fraction: number;
  radius: number;
  circumference: number;
  strokeWidth: number;
  color: string;
  pulseArrow: () => void;
}

function ProgressLoop({
  i,
  isLast,
  fraction,
  radius,
  circumference,
  strokeWidth,
  color,
  pulseArrow,
}: ProgressLoopProps) {
  const progressValue = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progressValue.value),
  }));

  useEffect(() => {
    async function animateLoop() {
      await new Promise((res) => setTimeout(res, i * 420));

      const easingFunction = isLast ? Easing.out(Easing.cubic) : Easing.linear;
      const duration = isLast ? 600 : 400;

      progressValue.value = await withTiming(
        isLast ? (fraction ? fraction : 1) : 1,
        { duration, easing: easingFunction }
      );

      if (isLast) runOnJS(pulseArrow)();
    }

    animateLoop();
  }, []);

  return (
    <AnimatedCircle
      cx={radius + strokeWidth / 2}
      cy={radius + strokeWidth / 2}
      r={radius}
      stroke={color}
      fill="none"
      strokeWidth={strokeWidth * 0.9}
      strokeLinecap="round"
      strokeDasharray={`${circumference} ${circumference}`}
      transform={`rotate(-90 ${radius + strokeWidth / 2} ${
        radius + strokeWidth / 2
      })`}
      animatedProps={animatedProps}
    />
  );
}
