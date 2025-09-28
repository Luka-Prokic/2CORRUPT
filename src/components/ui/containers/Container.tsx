import React from "react";
import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useTheme } from "../../../config/ThemeContext";
import useFadeInAnim from "../../../animations/useFadeInAnim";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  paddingHorizontal?: DimensionValue;
}

export default function Container({
  children,
  style,
  paddingHorizontal = "5%",
}: ContainerProps) {
  const { theme } = useTheme();
  const { fadeIn } = useFadeInAnim(true);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: theme.background,
          flex: 1,
          paddingHorizontal: paddingHorizontal,
        },
        style,
        fadeIn,
      ]}
    >
      {children}
    </Animated.View>
  );
}
