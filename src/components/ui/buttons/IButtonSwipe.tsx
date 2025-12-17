import { Pressable, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { WIDTH } from "../../../utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { DescriptionText } from "../text/DescriptionText";
import { useHaptics } from "../../../features/ui/useHaptics";
import { scheduleOnRN } from "react-native-worklets";
import { useState } from "react";

type IButtonSwipeProps = {
  width?: number;
  height?: number;
  confirmed?: boolean;
  onSwipeComplete?: () => void;
  onCancel?: () => void;
  style?: ViewStyle | ViewStyle[];
  knobChild?: React.ReactNode;
  slideChild?: React.ReactNode;
  slideText?: string;
  haptics?: boolean;
  finalSwipe?: boolean;
};

export function IButtonSwipe({
  width = WIDTH - 32,
  height = 64,
  confirmed = false,
  onSwipeComplete,
  style,
  knobChild,
  slideChild,
  slideText,
  haptics = false,
  onCancel,
  finalSwipe = true,
}: IButtonSwipeProps) {
  const { theme } = useSettingsStore();
  const triggerHapticsSuccess = useHaptics({
    modeType: "on",
    hapticType: "heavy",
  });
  const successHaptic =
    haptics && !confirmed ? triggerHapticsSuccess : () => {};
  const triggerHapticsRigid = useHaptics({
    modeType: "max",
    hapticType: "rigid",
  });
  const triggerHapticsError = useHaptics({
    modeType: "on",
    hapticType: "error",
  });
  const triggerHapticsSoft = useHaptics({
    modeType: "max",
    hapticType: "soft",
  });

  console.log(confirmed);

  const [moving, setMoving] = useState<boolean>(false);

  const THUMB_SIZE = height - 4;
  const maxTranslateX = width - THUMB_SIZE - 4;

  const translateX = useSharedValue<number>(confirmed ? maxTranslateX : 0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      scheduleOnRN(setMoving, true);
      if (confirmed) return;
      translateX.value = Math.min(Math.max(0, e.translationX), maxTranslateX);
    })
    .onEnd(() => {
      if (translateX.value > maxTranslateX * 0.85) {
        translateX.value = withSpring(finalSwipe ? maxTranslateX : 0);
        scheduleOnRN(successHaptic);
        scheduleOnRN(onSwipeComplete ? onSwipeComplete : () => {});
        scheduleOnRN(setMoving, false);
      } else {
        translateX.value = withSpring(0);
        scheduleOnRN(haptics ? triggerHapticsRigid : () => {});
        scheduleOnRN(setMoving, false);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function handlePressIn() {
    setMoving(true);
    if (haptics) triggerHapticsSoft();
  }
  function handlePressOut() {
    setMoving(false);
  }

  function handleCancel() {
    setMoving(false);
    if (onCancel && confirmed) {
      translateX.value = withTiming(0);
      onCancel();
      if (haptics) triggerHapticsError();
    }
  }

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: theme.grayText + "60",
          justifyContent: "center",
          overflow: "hidden",
          paddingHorizontal: 2,
        },
        style,
      ]}
    >
      {slideChild || (
        <DescriptionText
          text={slideText || "Swipe to confirm"}
          style={{
            position: "absolute",
            width,
            textAlign: "center",
            opacity: confirmed ? 0 : 1,
          }}
        />
      )}

      <GestureDetector gesture={pan}>
        <Pressable
          onLongPress={handleCancel}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[
              {
                width: moving ? THUMB_SIZE * 1.2 : THUMB_SIZE,
                height: moving ? THUMB_SIZE * 0.95 : THUMB_SIZE,
                borderRadius: THUMB_SIZE / 2,
                backgroundColor: theme.secondaryBackground,
                justifyContent: "center",
                alignItems: "center",
              },
              // @ts-expect-error Reanimated 3 transition props
              {
                transitionProperty: ["width", "height"],
                transitionDuration: 200,
                transitionTimingFunction: "ease-in",
              },
              thumbStyle,
            ]}
          >
            {knobChild || (
              <Ionicons name="chevron-forward" size={24} color={theme.text} />
            )}
          </Animated.View>
        </Pressable>
      </GestureDetector>
    </View>
  );
}
