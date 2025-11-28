import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { IButton } from "../ui/buttons/IButton";
import { CorruptTittle } from "./CorruptTittle";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SessionTimer } from "../ui/timer/SessionTimer";
import { CorruptRestTimer } from "./CorruptRestTimer";

export const CORRUPT_BUTTON_FROM_BOTTOM = 22;
export const CORRUPT_BUTTON_HEIGHT = 64;
const CORRUPT_GAP = 8;

export function CorruptButtonMock() {
  const { theme } = useSettingsStore();
  const { typeOfView } = useUIStore();
  const { activeTemplate, restingExerciseId } = useWorkoutStore();
  const insets = useSafeAreaInsets();

  const backgroundColor =
    activeTemplate && typeOfView === "template" ? theme.tint : theme.accent;

  // --- Bottom animation (spring) ---
  const bottom = useSharedValue(CORRUPT_BUTTON_FROM_BOTTOM + insets.bottom);

  useEffect(() => {
    const target =
      typeOfView === "home"
        ? HEIGHT / 2 - CORRUPT_BUTTON_HEIGHT - CORRUPT_GAP
        : CORRUPT_BUTTON_FROM_BOTTOM + insets.bottom;

    bottom.value = withSpring(target, {
      damping: 12,
      stiffness: 100,
      mass: 0.6,
    });
  }, [typeOfView, insets.bottom]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    right: 0,
    width: WIDTH,
    height: CORRUPT_BUTTON_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    zIndex: 10,
    bottom: bottom.value,
    flexDirection: "row",
    gap: 8,
  }));

  // --- Width animation (timing) ---
  const width = useSharedValue(WIDTH - 32);

  useEffect(() => {
    width.value =
      !!restingExerciseId && typeOfView === "workout"
        ? withTiming(CORRUPT_BUTTON_HEIGHT, { duration: 250 })
        : withTiming(WIDTH - 32, { duration: 250 });
  }, [restingExerciseId, typeOfView]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  // --- Navigation ---
  const handleCorruptPress = () => {
    router.push(`/${typeOfView}-board`);
  };

  return (
    <Animated.View style={animatedContainerStyle}>
      {/* Rest timer row */}
      {!!restingExerciseId && typeOfView === "workout" && (
        <CorruptRestTimer size={CORRUPT_BUTTON_HEIGHT} />
      )}

      {/* Main button */}
      <Animated.View style={animatedButtonStyle}>
        <IButton
          onPress={handleCorruptPress}
          style={{
            height: CORRUPT_BUTTON_HEIGHT,
            borderRadius: CORRUPT_BUTTON_HEIGHT / 2,
            backgroundColor,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
              !!restingExerciseId && typeOfView === "workout"
                ? "center"
                : "space-between",
            paddingHorizontal: 16,
          }}
        >
          {typeOfView !== "workout" ? (
            <CorruptTittle style={{ color: theme.border, fontSize: 22 }} />
          ) : !restingExerciseId ? (
            <SessionTimer />
          ) : null}

          <Ionicons name="chevron-forward" size={34} color={theme.border} />
        </IButton>
      </Animated.View>
    </Animated.View>
  );
}
