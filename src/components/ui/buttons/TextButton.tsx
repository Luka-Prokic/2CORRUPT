import React from "react";
import { TouchableOpacity, Text, ViewStyle, TouchableOpacityProps } from "react-native";
import { useTheme } from "../../../config/ThemeContext";

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
  const { theme } = useTheme();

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
