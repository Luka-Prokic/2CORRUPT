import React from "react";
import { TouchableOpacity, Text, ViewStyle, TouchableOpacityProps } from "react-native";
import { useThemeStore } from "../../../stores/themeStore"; import Colors from "../../../config/constants/Colors";

interface TextButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: ViewStyle;
  color?: string;
}

export default function TextButton({
  title,
  style,
  textStyle,
  color,
  ...rest
}: TextButtonProps) {
  const { themeName } = useThemeStore(); const theme = Colors[themeName];

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          {
            fontSize: 18,
            fontWeight: "600",
            color: color ?? theme.tint,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
