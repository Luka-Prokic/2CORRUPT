import React from "react";
import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useTheme } from "../../../config/ThemeContext";
import useFadeInAnim from "../../../animations/useFadeInAnim";

interface CenterContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  paddingHorizontal?: DimensionValue;
}

export default function CenterContainer({
  children,
  style,
  paddingHorizontal = "5%",
}: CenterContainerProps) {
  const { theme } = useTheme();
  const { fadeIn } = useFadeInAnim(true);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: theme.background,
          flex: 1,
          paddingHorizontal: paddingHorizontal,
          justifyContent: "center",
        },
        style,
        fadeIn,
      ]}
    >
      {children}
    </Animated.View>
  );
}
