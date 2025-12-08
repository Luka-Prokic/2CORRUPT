import { useCallback } from "react";
import { Platform, Vibration } from "react-native";
import * as Haptics from "expo-haptics";
import { useSettingsStore } from "../../stores/settings";
import { HapticsMode } from "../../stores/settings/types";

export type HapticType =
  | "soft"
  | "light"
  | "medium"
  | "heavy"
  | "rigid"
  | "selection"
  | "success"
  | "warning"
  | "error";

const MODE_LEVEL = {
  off: 0,
  gentle: 1,
  on: 2,
  max: 3,
} as const;

const HAPTIC_MAP: Record<HapticType, () => void> = {
  soft: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  rigid: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
  selection: () => Haptics.selectionAsync(),
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

interface UseHapticsProps {
  modeType?: HapticsMode | "ignore"; // requirement for this specific action
  hapticType: HapticType; // actual haptic to trigger
}

export const useHaptics = ({
  modeType = "on",
  hapticType,
}: UseHapticsProps) => {
  const { haptics } = useSettingsStore();

  const trigger = useCallback(() => {
    // ❗ FILTER: if global mode is weaker than required — ABORT
    if (
      modeType !== "ignore" &&
      MODE_LEVEL[haptics.toLowerCase()] < MODE_LEVEL[modeType]
    )
      return;

    // ANDROID fallback
    if (Platform.OS !== "ios") {
      Vibration.vibrate(10);
      return;
    }

    HAPTIC_MAP[hapticType]?.();
  }, [modeType, hapticType, haptics]);

  return trigger;
};

export const useHapticsDynamic = () => {
  const { haptics: storeHaptics } = useSettingsStore();

  const trigger = useCallback(
    (
      modeType: HapticsMode | "ignore",
      hapticType: HapticType,
      currentHaptics?: HapticsMode
    ) => {
      const effectiveHaptics = currentHaptics ?? storeHaptics;

      if (
        modeType !== "ignore" &&
        MODE_LEVEL[effectiveHaptics.toLowerCase()] < MODE_LEVEL[modeType]
      )
        return;

      if (Platform.OS !== "ios") {
        Vibration.vibrate(10);
        return;
      }

      HAPTIC_MAP[hapticType]?.();
    },
    [storeHaptics]
  );

  return trigger;
};

export const useHapticsIgnore = () => {
  const trigger = useCallback((hapticType: HapticType) => {
    if (Platform.OS !== "ios") {
      Vibration.vibrate(10);
      return;
    }

    HAPTIC_MAP[hapticType]?.();
  }, []);

  return trigger;
};
