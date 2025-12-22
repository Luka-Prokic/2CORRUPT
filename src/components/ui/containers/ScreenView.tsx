import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  HeaderComponent?: React.ReactNode;
}

export function ScreenView({ children, style }: ScreenViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        alignItems: "center",
        flex: 1,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
