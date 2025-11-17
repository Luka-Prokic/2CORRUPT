import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";
import { IButton } from "../ui/buttons/IButton";
import { CorruptTittle } from "./CorruptTittle";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutStore } from "../../stores/workout";

export const CORRUPT_BUTTON_FROM_BOTTOM = 22;
export const CORRUPT_BUTTON_HEIGHT = 64;
const CORRUPT_GAP = 8;

export const CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM =
  CORRUPT_BUTTON_FROM_BOTTOM + CORRUPT_BUTTON_HEIGHT;

export function CorruptButton() {
  const { theme } = useSettingsStore();
  const { typeOfView } = useUIStore();
  const { activeTemplate } = useWorkoutStore();
  const insets = useSafeAreaInsets();

  const backgroundColor =
    activeTemplate && typeOfView === "template" ? theme.tint : theme.accent;

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

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    right: 0,
    width: WIDTH,
    height: CORRUPT_BUTTON_HEIGHT,
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 10,
    bottom: bottom.value,
  }));

  const handleCorruptPress = () => {
    router.push(`/${typeOfView}-board`);
  };

  return (
    <Animated.View style={animatedStyle}>
      <IButton
        onPress={handleCorruptPress}
        style={{
          width: WIDTH - 32,
          height: CORRUPT_BUTTON_HEIGHT,
          borderRadius: 100,
          backgroundColor,
          borderWidth: 1,
          borderColor: theme.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <CorruptTittle style={{ color: theme.border, fontSize: 22 }} />
        <Ionicons name="chevron-forward" size={28} color={theme.border} />
      </IButton>
    </Animated.View>
  );
}
