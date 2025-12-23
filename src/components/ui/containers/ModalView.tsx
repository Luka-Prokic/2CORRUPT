import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  HeaderComponent?: React.ReactNode;
}

export function ModalView({ children, style }: ModalViewProps) {
  const insets = useSafeAreaInsets();
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
