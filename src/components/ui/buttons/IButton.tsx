import React from "react";
import { TouchableOpacity, Text, ViewStyle, TouchableOpacityProps } from "react-native";
import { useTheme } from "../../../config/ThemeContext";

interface IButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    title?: string;
    children?: React.ReactNode;
    color?: string;
    textColor?: string;
    style?: ViewStyle | ViewStyle[];
}

export default function IButton({ 
    title, 
    children, 
    color, 
    style, 
    textColor,
    ...rest 
}: IButtonProps) {
    const { theme } = useTheme();

    return (
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
                    backgroundColor: color,
                    opacity: rest.disabled ? 0.6 : 1,
                },
                style
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            {...rest}
        >
            {children ? children : (
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: textColor ?? theme.text
                }}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}