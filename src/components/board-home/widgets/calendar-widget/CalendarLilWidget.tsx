import { TouchableOpacity, View, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useMonthSlugs } from "../../../../features/Labels";
import { useSessionsByDate } from "../../../../features/workout";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function CalendarLilWidget() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const monthSlugs = useMonthSlugs();

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();

  const sessionsToday = useSessionsByDate(today);
  const workoutsDone = sessionsToday.length;
  const workoutsPlanned = 2.8 - 0.0001; // Example goal
  const rawProgress = workoutsDone / workoutsPlanned; // e.g., 2.5
  const fullLoops = Math.floor(rawProgress); // 2
  const fraction = rawProgress - fullLoops; // 0.5

  const size = widgetUnit / 2;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  function handleWidgetPress() {
    router.push("/sessions");
  }

  const loopsArray = Array.from({ length: fullLoops + (fraction > 0 ? 1 : 0) });

  // Shared value for arrow scale
  const arrowScale = useSharedValue(1);

  // Function to pulse arrow
  function pulseArrow() {
    arrowScale.value = withTiming(1.2, { duration: 100 }, () => {
      arrowScale.value = withTiming(1, { duration: 100 });
    });
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: widgetUnit,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: theme.border,
        padding: 12,
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ position: "absolute", bottom: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          Summary
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          width: size,
          height: size,
        }}
      >
        <Svg width={size} height={size}>
          {/* Base ring */}
          <Circle
            stroke={hexToRGBA(theme.text, 0.2)}
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

            const progressValue = useSharedValue(0);

            useEffect(() => {
              async function animateLoop() {
                await new Promise((res) => setTimeout(res, i * 420));

                const easingFunction = isLast
                  ? Easing.out(Easing.cubic)
                  : Easing.linear;
                const duration = isLast ? 600 : 400;

                progressValue.value = await withTiming(
                  isLast ? (fraction ? fraction : 1) : 1,
                  {
                    duration,
                    easing: easingFunction,
                  }
                );

                // Pulse arrow after loop completes
                runOnJS(pulseArrow)();
              }
              animateLoop();
            }, []);

            const animatedProps = useAnimatedProps(() => ({
              strokeDashoffset: circumference * (1 - progressValue.value),
            }));

            return (
              <AnimatedCircle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                fill="none"
                strokeWidth={strokeWidth * 0.9}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                animatedProps={animatedProps}
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

        {/* Center date/month */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {todayDate}
          </Text>
          <Text
            style={{
              color: theme.accent,
              fontSize: 16,
              marginTop: 2,
              fontWeight: "bold",
            }}
          >
            {monthSlugs[todayMonth]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
