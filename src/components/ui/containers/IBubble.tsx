import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useMemo } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  EntryExitAnimationFunction,
} from "react-native-reanimated";
import { InfoText } from "../text/InfoText";
import { Pressable, ViewStyle } from "react-native";
import { MidText } from "../text/MidText";
import { DescriptionText } from "../text/DescriptionText";
import { useHaptics } from "../../../features/ui/useHaptics";
import { Shine } from "../misc/Shine";

interface IBubbleProps {
  header?: string;
  info?: string;
  description?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  height?: number;
  width?: number;
  size?: "small" | "medium" | "large" | "flexible";
  noAnimation?: boolean;
  entering?: EntryExitAnimationFunction;
  exiting?: EntryExitAnimationFunction;
  style?: ViewStyle | ViewStyle[];
  styleContent?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  haptics?: boolean;
  noBorder?: boolean;
  noShine?: boolean;
  shineColor?: string;
}

export function IBubble({
  header,
  info,
  description,
  children,
  backgroundColor,
  height,
  width,
  size = "medium",
  noAnimation = false,
  entering,
  exiting,
  style,
  onPress,
  styleContent,
  haptics = false,
  noBorder = false,
  noShine = false,
  shineColor,
}: IBubbleProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const triggerHaptics = useHaptics({ modeType: "off", hapticType: "medium" });

  const bubbleHeight = useMemo(() => {
    if (size === "small") return 44;
    if (size === "medium") return 64;
    if (size === "large") return widgetUnit;
    if (size === "flexible") return undefined;
  }, [size, widgetUnit]);

  function handlePress() {
    onPress?.();
    if (haptics) triggerHaptics();
  }
  return (
    <Animated.View
      entering={noAnimation ? undefined : entering ?? FadeIn}
      exiting={noAnimation ? undefined : exiting ?? FadeOut}
      style={{
        flex: size === "flexible" ? 1 : undefined,
        height: size === "flexible" ? undefined : height ?? bubbleHeight,
        width: width ?? fullWidth,
        borderRadius: noBorder ? 0 : 32,
        backgroundColor: backgroundColor ?? theme.text + "10",
        overflow: "hidden",
        borderWidth: noBorder ? 0 : 1,
        borderColor: theme.text + "10",
        ...style,
      }}
    >
      {!noShine && (
        <Shine color={shineColor} style={{ borderRadius: noBorder ? 0 : 32 }} />
      )}
      <Pressable
        onPress={handlePress}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          ...styleContent,
        }}
      >
        {header && <MidText text={header} />}
        {description && <DescriptionText text={description} />}
        {children}
        {info && <InfoText text={info} />}
      </Pressable>
    </Animated.View>
  );
}
