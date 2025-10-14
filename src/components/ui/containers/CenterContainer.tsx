import { ViewStyle, DimensionValue, Animated } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useFadeInAnim } from "../../../animations/useFadeInAnim";

interface CenterContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  paddingHorizontal?: DimensionValue;
}

export function CenterContainer({
  children,
  style,
  paddingHorizontal = "5%",
}: CenterContainerProps) {
  const { theme } = useSettingsStore();
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
