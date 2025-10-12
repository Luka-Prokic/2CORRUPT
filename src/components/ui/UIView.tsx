import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useUIStore } from "../../stores/ui";
import { HomeViewType } from "../../stores/ui/types";
import { HEIGHT, WIDTH } from "../../features/Dimensions";

interface UIViewProps {
  type: HomeViewType;
  children: React.ReactNode;
}

export function UIView({ type, children }: UIViewProps) {
  const { typeOfView } = useUIStore();

  const [visible, setVisible] = useState<boolean>(false);

  const viewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (typeOfView === type) {
      setVisible(true);
      Animated.timing(viewOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(viewOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [typeOfView, type]);

  if (visible)
    return (
      <Animated.View
        style={{
          height: HEIGHT,
          width: WIDTH,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: viewOpacity,
        }}
      >
        {children}
      </Animated.View>
    );
  return null;
}
