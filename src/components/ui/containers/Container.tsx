import { ViewStyle, DimensionValue } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import Animated, { FadeIn } from "react-native-reanimated";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  paddingHorizontal?: DimensionValue;
}

export function Container({
  children,
  style,
  paddingHorizontal = 16,
}: ContainerProps) {
  const { theme } = useSettingsStore();

  return (
    <Animated.View
      entering={FadeIn}
      style={[
        {
          backgroundColor: theme.background,
          flex: 1,
          paddingHorizontal: paddingHorizontal,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
