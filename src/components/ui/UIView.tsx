import { useEffect, useState } from "react";
import { useUIStore } from "../../stores/ui";
import { HomeViewType } from "../../stores/ui/types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface UIViewProps {
  type: HomeViewType;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function UIView({ type, children, style }: UIViewProps) {
  const { typeOfView } = useUIStore();
  const [visible, setVisible] = useState(typeOfView === type);

  useEffect(() => {
    if (typeOfView === type) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [typeOfView, type]);

  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flex: 1,
        ...style,
      }}
    >
      {children}
    </Animated.View>
  );
}
