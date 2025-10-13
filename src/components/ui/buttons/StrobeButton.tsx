import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StrobeBlur } from "../misc/StrobeBlur";

interface StrobeButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title?: string;
  children?: React.ReactNode;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  strobeColors?: [string, string, string, string];
  strobeDisabled?: boolean;
  strobeTint?: "default" | "light" | "dark" | "auto";
}

export function StrobeButton({
  title,
  children,
  strobeColors,
  style,
  textColor,
  strobeDisabled = false,
  strobeTint = "light",
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
      style={{
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: rest.disabled ? 0.6 : 1,
        ...style,
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.5}
      {...rest}
    >
      <StrobeBlur
        colors={colors}
        style={{ width: "100%", height: "100%" }}
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
    </TouchableOpacity>
  );
}
