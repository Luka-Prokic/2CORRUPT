import { useState } from "react";
import { View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { OptionButton } from "./OptionButton";
import { useSmoothHeightAnim } from "../../../animations/useSmoothHeightAnim";

interface DropDownButtonProps {
  initialChildren?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
  snapPoints: [number, number]; // [initial height, expanded height]
  initialText?: string;
  expandedText?: string;
}

export function DropDownButton({
  initialChildren,
  children,
  style,
  snapPoints,
  initialText = "Show More",
  expandedText = "Show Less",
}: DropDownButtonProps) {
  const { theme } = useSettingsStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { animatedStyle } = useSmoothHeightAnim({ isExpanded, snapPoints });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const currentHeight = isExpanded ? snapPoints[1] : snapPoints[0];

  return (
    <Animated.View
      style={[
        {
          overflow: "hidden",
          height: currentHeight,
        },
        style,
        animatedStyle,
      ]}
    >
      {initialChildren ? (
        initialChildren
      ) : (
        <OptionButton
          title={isExpanded ? expandedText : initialText}
          onPress={toggleExpanded}
          height={snapPoints[0]}
          style={style}
          icon={
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color={theme.text}
            />
          }
        />
      )}

      {isExpanded && <View style={{ flex: 1 }}>{children}</View>}
    </Animated.View>
  );
}
