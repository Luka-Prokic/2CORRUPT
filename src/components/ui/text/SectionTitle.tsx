import { Text, TextProps, TextStyle, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Fragment } from "react";
import { StrobeBlur } from "../misc/StrobeBlur";
import { WIDTH } from "../../../utils/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface SectionTitleProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  styleStrobe?: ViewStyle | ViewStyle[];
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
  children?: React.ReactNode;
}

export function SectionTitle({
  text,
  style,
  styleStrobe,
  size = 28,
  weight = "bold",
  color,
  children,
  ...rest
}: SectionTitleProps) {
  const { theme } = useSettingsStore();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        height: 44,
        width: WIDTH,
        ...styleStrobe,
      }}
    >
      <StrobeBlur
        style={{
          height: 44,
          width: WIDTH,
          ...styleStrobe,
        }}
        strobeColor={theme.secondaryBackground}
        tint="auto"
      >
        <LinearGradient
          colors={[
            theme.background,
            theme.background + "00",
            theme.background + "00",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: 44,
            width: WIDTH,
            ...styleStrobe,
          }}
        >
          <Text
            style={{
              fontSize: size,
              fontWeight: weight,
              color: color ?? theme.text,
              ...style,
            }}
            {...rest}
          >
            {children ? (
              <Fragment>
                {text} {children}
              </Fragment>
            ) : (
              text
            )}
          </Text>
        </LinearGradient>
      </StrobeBlur>
    </Animated.View>
  );
}
