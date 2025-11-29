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
import { hexToRGBA } from "../../../features/HEXtoRGB";

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
  onPress?: () => void;
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
}: IBubbleProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();

  const bubbleHeight = useMemo(() => {
    if (size === "small") return 44;
    if (size === "medium") return 64;
    if (size === "large") return widgetUnit;
    if (size === "flexible") return undefined;
  }, [size, widgetUnit]);

  return (
    <Animated.View
      entering={noAnimation ? undefined : entering ?? FadeIn}
      exiting={noAnimation ? undefined : exiting ?? FadeOut}
      style={{
        flex: 1,
        height: size === "flexible" ? undefined : height ?? bubbleHeight,
        width: width ?? fullWidth,
        borderRadius: 32,
        backgroundColor:
          backgroundColor ?? hexToRGBA(theme.fourthBackground, 0.6),
        overflow: "hidden",
        borderWidth: 1,
        borderColor: hexToRGBA(theme.fourthBackground, 0.4),
        ...style,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {header && <MidText text={header} />}
        {description && <DescriptionText text={description} />}
        {children}
        {info && <InfoText text={info} />}
      </Pressable>
    </Animated.View>
  );
}
