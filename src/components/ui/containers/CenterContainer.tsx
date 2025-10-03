import React from "react";
import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore"; import Colors from "../../../config/constants/Colors";
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
  const { themeName } = useSettingsStore(); const theme = Colors[themeName];
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
