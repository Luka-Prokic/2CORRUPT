import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useFadeInAnim } from "../../../animations/useFadeInAnim";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  paddingHorizontal?: DimensionValue;
}

export function Container({
  children,
  style,
  paddingHorizontal = "5%",
}: ContainerProps) {
  const { theme } = useSettingsStore();
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
