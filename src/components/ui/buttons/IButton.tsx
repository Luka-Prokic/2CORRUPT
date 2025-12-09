import {
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
} from "react-native";
import { HapticsMode, useSettingsStore } from "../../../stores/settingsStore";
import { IText } from "../text/IText";
import { useHaptics } from "../../../features/ui/useHaptics";

interface IButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title?: string;
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  haptics?: HapticsMode | boolean;
}

export function IButton({
  title,
  children,
  color,
  style,
  textColor,
  haptics = false,
  ...rest
}: IButtonProps) {
  const { theme } = useSettingsStore();

  const hapticsMode =
    typeof haptics === "string" ? (haptics as HapticsMode) : "max";
  const triggerHaptics = useHaptics({
    modeType: hapticsMode,
    hapticType: "medium",
  });

  function handlePress(e: GestureResponderEvent) {
    rest?.onPress(e);
    if (haptics) triggerHaptics();
  }

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
        style,
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...rest}
      onPress={(e) => handlePress(e)}
    >
      {children ? (
        children
      ) : (
        <IText
          text={title}
          style={{
            color: textColor ?? theme.text,
            textAlign: "center",
          }}
          weight="bold"
          numberOfLines={1}
          adjustsFontSizeToFit
        />
      )}
    </TouchableOpacity>
  );
}
