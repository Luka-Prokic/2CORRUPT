import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StrobeBlur } from "../misc/StrobeBlur";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface StrobeButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title?: string;
  children?: React.ReactNode;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
  strobeColors?: [string, string, string, string];
  strobeDisabled?: boolean;
  strobeTint?: "default" | "light" | "dark" | "auto";
  pressable?: boolean;
}

export function StrobeButton({
  title,
  children,
  strobeColors,
  style,
  contentContainerStyle,
  textColor,
  strobeDisabled = false,
  strobeTint = "light",
  pressable,
  ...rest
}: StrobeButtonProps) {
  const { theme } = useSettingsStore();

  const colors: [string, string, string, string] = strobeColors ?? [
    theme.caka,
    theme.primaryBackground,
    theme.accent,
    theme.tint,
  ];

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={pressable ? 1 : 0.8}
      {...rest}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[
          {
            overflow: "hidden",
            opacity: rest.disabled ? 0.6 : 1,
          },
          style,
        ]}
      >
        <StrobeBlur
          colors={colors}
          style={{ width: "100%", height: "100%", ...contentContainerStyle }}
          disabled={strobeDisabled}
          tint={strobeTint}
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
        </StrobeBlur>
      </Animated.View>
    </TouchableOpacity>
  );
}
