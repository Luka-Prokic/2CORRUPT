import { useEffect, useState } from "react";
import { useUIStore } from "../../stores/ui";
import { HomeViewType } from "../../stores/ui/types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface UIViewProps {
  type: HomeViewType;
  children: React.ReactNode;
}

export function UIView({ type, children }: UIViewProps) {
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
      }}
    >
      {children}
    </Animated.View>
  );
}
