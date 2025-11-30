import React, { useState, useEffect } from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

import { BackgroundText } from "../text/BackgroundText";
import { InfoText } from "../text/InfoText";

interface ExpandableBubbleProps {
  header?: string;
  info?: string;
  description?: string;

  onToggle?: () => void;

  collapsedHeight?: number;
  expandedHeight?: number;

  backgroundColor?: string;
  width?: number;

  expandedChildren?: React.ReactNode;
  collapsedChildren?: React.ReactNode;
  children?: React.ReactNode;

  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  noAnimation?: boolean;
}

export function ExpandableBubble({
  header,
  info,
  description,
  children,
  expandedChildren,
  collapsedChildren,
  onToggle,
  collapsedHeight = 64,
  expandedHeight,

  backgroundColor,
  width,

  disabled = false,
  style,
  noAnimation = false,
}: ExpandableBubbleProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();

  const _collapsed = collapsedHeight ?? widgetUnit;
  const _expanded = expandedHeight ?? fullWidth;

  const [expanded, setExpanded] = useState(false);

  const height = useSharedValue(_collapsed);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  function toggle() {
    if (disabled) return;
    if (expanded) {
      height.value = withTiming(_collapsed, { duration: 300 });
      setExpanded(false);
    } else {
      height.value = withTiming(_expanded, { duration: 300 });
      setExpanded(true);
    }
    onToggle?.();
  }

  // collapse automatically if disabled
  useEffect(() => {
    if (disabled) {
      height.value = withTiming(_collapsed, { duration: 300 });
      setExpanded(false);
    }
  }, [disabled]);

  return (
    <Animated.View
      entering={noAnimation ? undefined : FadeIn}
      exiting={noAnimation ? undefined : FadeOut}
      style={[
        {
          width: width ?? fullWidth,
          borderRadius: 32,
          overflow: "hidden",
          backgroundColor: backgroundColor ?? theme.text + "10",
          borderWidth: 1,
          borderColor: theme.text + "10",
        },
        animatedStyle,
        style,
      ]}
    >
      <Pressable onPress={toggle} style={{ flex: 1, alignItems: "center" }}>
        {/* Expand/Collapse Button Layer */}
        {!disabled && (
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={32}
            color={theme.text}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
            }}
          />
        )}
        {/* Background Label */}
        {header && <BackgroundText text={header} />}
        {description && <BackgroundText text={description} />}
        {/* Children Content */}
        {children ?? null}
        {expanded ? expandedChildren ?? null : collapsedChildren ?? null}
        {/* Info Text */}
        {info && <InfoText text={info} />}
      </Pressable>
    </Animated.View>
  );
}
