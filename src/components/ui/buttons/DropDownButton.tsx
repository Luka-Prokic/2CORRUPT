import React, { useState } from "react";
import { View, ViewStyle, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore"; import Colors from "../../../config/constants/Colors";
import OptionButton from "./OptionButton";
import { useRotateAnimation } from "../../../animations/useRotateAnimation";
import { useSmoothHeightAnim } from "../../../animations/useSmoothHeightAnim";

interface DropDownButtonProps {
  initialChildren?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
  snapPoints: [number, number]; // [initial height, expanded height]
  initialText?: string;
  expandedText?: string;
}

export default function DropDownButton({
  initialChildren,
  children,
  style,
  snapPoints,
  initialText = "Show More",
  expandedText = "Show Less",
}: DropDownButtonProps) {
  const { themeName } = useSettingsStore(); const theme = Colors[themeName];
  const [isExpanded, setIsExpanded] = useState(false);
  const { rotateStyle } = useRotateAnimation(isExpanded);
  const { animatedStyle } = useSmoothHeightAnim(isExpanded, snapPoints, 300);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const currentHeight = isExpanded ? snapPoints[1] : snapPoints[0];

  return (
    <Animated.View
      style={[
        {
          borderWidth: 1,
          borderRadius: 8,
          overflow: "hidden",
          height: currentHeight,
          backgroundColor: theme.background,
          borderColor: theme.border,
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
            <Animated.View style={rotateStyle}>
              <Ionicons name="chevron-down" size={24} color={theme.text} />
            </Animated.View>
          }
        />
      )}

      {isExpanded && <View style={{ flex: 1 }}>{children}</View>}
    </Animated.View>
  );
}
