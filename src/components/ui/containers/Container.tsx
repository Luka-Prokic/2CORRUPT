import React from "react";
import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore"; import Colors from "../../../config/constants/Colors";
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
  const { themeName } = useSettingsStore(); const theme = Colors[themeName];
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
