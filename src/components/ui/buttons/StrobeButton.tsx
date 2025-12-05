import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StrobeBlur, StrobeBlurProps } from "../misc/StrobeBlur";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { IText } from "../text/IText";

export interface StrobeButtonProps
  extends Omit<TouchableOpacityProps, "style">,
    Omit<StrobeBlurProps, "style"> {
  title?: string;
  children?: React.ReactNode;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
  styleContent?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  strobeColors?: [string, string, string, string];
  strobeDisabled?: boolean;
  strobeTint?: "default" | "light" | "dark" | "auto";
  pressable?: boolean;
  animatedEntering?: boolean;
  animatedExiting?: boolean;
}

export function StrobeButton({
  title,
  children,
  strobeColors,
  style,
  contentContainerStyle,
  styleContent,
  textColor,
  strobeDisabled = false,
  strobeTint = "light",
  pressable,
  animatedEntering = true,
  animatedExiting = false,
  freeze = false,
  duration,
  textStyle,
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
      style={[
        {
          width: "100%",
          height: "100%",
          opacity: rest.disabled ? 0.8 : 1,
          overflow: "hidden",
        },
        style,
      ]}
      {...rest}
    >
      <Animated.View
        entering={animatedEntering ? FadeIn : undefined}
        exiting={animatedExiting ? FadeOut : undefined}
        style={[StyleSheet.absoluteFill]}
      >
        <StrobeBlur
          colors={colors}
          style={{ width: "100%", height: "100%", ...contentContainerStyle }}
          styleContent={{
            width: "100%",
            height: "100%",
            ...styleContent,
          }}
          disabled={strobeDisabled}
          tint={strobeTint}
          freeze={freeze}
          duration={duration}
        >
          {children ? (
            children
          ) : title ? (
            <IText
              text={title}
              color={textColor ?? theme.text}
              style={textStyle}
            />
          ) : null}
        </StrobeBlur>
      </Animated.View>
    </TouchableOpacity>
  );
}
