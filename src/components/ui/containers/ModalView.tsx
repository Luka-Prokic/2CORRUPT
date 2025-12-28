import { View, ViewStyle } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  HeaderComponent?: React.ReactNode;
  fadeIn?: boolean;
}

export function ModalView({ children, style, fadeIn = false }: ModalViewProps) {
  const insets = useSafeAreaInsets();
  if (fadeIn) {
    return (
      <Animated.View
        entering={FadeIn}
        style={{
          marginTop: insets.top + 32,
          alignItems: "center",
          flex: 1,
          ...style,
        }}
      >
        {children}
      </Animated.View>
    );
  }
  return (
    <View
      style={{
        marginTop: insets.top + 32,
        alignItems: "center",
        flex: 1,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
