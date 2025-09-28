import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
  Animated,
} from "react-native";
import { useTheme } from "../../../config/ThemeContext";
import useBounceScaleAnim from "../../../animations/useBounceScaleAnim";

interface BounceButtonProps
  extends Omit<TouchableOpacityProps, "style" | "onPress"> {
  title?: string;
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

export default function BounceButton({
  title,
  children,
  color,
  style,
  textColor,
  onPress,
  ...rest
}: BounceButtonProps) {
  const { theme } = useTheme();
  const { bounceAnim, bounceIt } = useBounceScaleAnim();

  const handlePress = () => {
    bounceIt();
    onPress?.();
  };

  return (
    <Animated.View style={[bounceAnim, style]}>
      <TouchableOpacity
        style={[
          {
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            overflow: "hidden",
            gap: 8,
            zIndex: 1,
            backgroundColor: color ?? theme.primaryBackground,
            opacity: rest.disabled ? 0.6 : 1,
          },
          style,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={handlePress}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: textColor ?? theme.text,
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
