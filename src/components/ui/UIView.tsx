import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useUIStore } from "../../stores/ui";
import { HomeViewType } from "../../stores/ui/types";

interface UIViewProps {
  type: HomeViewType;
  children: React.ReactNode;
}

export function UIView({ type, children }: UIViewProps) {
  const { typeOfView } = useUIStore();
  const [visible, setVisible] = useState(typeOfView === type);
  const viewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (typeOfView === type) {
      setVisible(true);
      Animated.timing(viewOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      setVisible(false);
      viewOpacity.setValue(0);
    }
  }, [typeOfView, type]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: viewOpacity,
      }}
    >
      {children}
    </Animated.View>
  );
}
