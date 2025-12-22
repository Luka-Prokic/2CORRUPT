import { Text, TextProps, TextStyle, View } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

interface ShineTextProps extends TextProps {
  text: string;
  size?: number;
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "bold"
    | "800"
    | "900";
  color?: string;
  shineColor?: string;
  style?: TextStyle | TextStyle[];
  duration?: number;
  delay?: number;
  constant?: boolean;
  focused?: boolean;
  width?: number; // REQUIRED for adjustsFontSizeToFit
}

export function ShineText({
  text,
  size = 36,
  weight = "bold",
  color,
  shineColor,
  style,
  duration = 3000,
  delay = 2000,
  constant = false,
  focused = false,
  width,
  numberOfLines = 1,
  adjustsFontSizeToFit,
  ...rest
}: ShineTextProps) {
  const { theme } = useSettingsStore();
  const translateX = useSharedValue(0);

  // Animation controller
  useEffect(() => {
    if (focused) {
      // Start shimmer
      translateX.value = 0;

      const shimmerOnce = withTiming(2, {
        duration,
        easing: Easing.linear,
      });

      if (constant) {
        translateX.value = withRepeat(withDelay(delay, shimmerOnce), -1, false);
      } else {
        translateX.value = shimmerOnce;
      }
    } else {
      // Finish current shimmer gracefully
      translateX.value = withTiming(0, {
        duration: duration,
        easing: Easing.linear,
      });
    }
  }, [focused, constant, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (translateX.value - 1) * (width ?? 200) }],
  }));

  const textStyle = {
    fontSize: size,
    fontWeight: weight,
    textAlign: "center",
    ...style,
  } as TextStyle;

  const shine = shineColor ?? theme.glow;

  return (
    <View style={width ? { width } : undefined}>
      <MaskedView
        maskElement={
          <Text
            {...rest}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            style={{ ...textStyle, color: color ?? theme.text }}
          >
            {text}
          </Text>
        }
      >
        {/* Base text */}
        <Text
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          style={{ ...textStyle, color: color ?? theme.text }}
        >
          {text}
        </Text>

        {/* Shine */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: width ? width / 2 : 200,
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={[shine + "00", shine, shine + "00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </MaskedView>
    </View>
  );
}
