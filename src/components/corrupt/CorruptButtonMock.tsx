import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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
import { useDracoFont } from "../../features/fonts/useDracoFont";

export const CORRUPT_BUTTON_FROM_BOTTOM = 22;
export const CORRUPT_BUTTON_HEIGHT = 64;
const CORRUPT_GAP = 8;

export function CorruptButtonMock() {
  const { theme } = useSettingsStore();
  const { typeOfView } = useUIStore();
  const { activeTemplate, activeSession } = useWorkoutStore();
  const insets = useSafeAreaInsets();
  const { fontFamily } = useDracoFont();

  const [sessionTime, setSessionTime] = useState(0);
  const [restTime, setRestTime] = useState<number | null>(null);
  const [isResting, setIsResting] = useState(false);

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Session timer
  useEffect(() => {
    if (activeSession && !isResting) {
      const interval = setInterval(() => setSessionTime((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isResting, activeSession]);

  // Rest timer
  useEffect(() => {
    if (typeOfView === "workout" && isResting && restTime !== null) {
      const interval = setInterval(() => {
        setRestTime((t) => {
          if (t! <= 1) {
            setIsResting(false);
            return null;
          }
          return t! - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isResting, restTime, typeOfView]);

  const startRest = () => {
    setRestTime(30);
    setIsResting(true);
  };
  const addRest = () => restTime !== null && setRestTime(restTime + 15);
  const removeRest = () =>
    restTime !== null && setRestTime(Math.max(0, restTime - 15));

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
        {typeOfView !== "workout" ? (
          <CorruptTittle style={{ color: theme.border, fontSize: 22 }} />
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{ color: theme.border, fontSize: 20, fontWeight: "bold" }}
            >
              {isResting && restTime !== null
                ? formatTime(restTime)
                : formatTime(sessionTime)}
            </Text>
            {isResting && (
              <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
                <TouchableOpacity
                  onPress={addRest}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    backgroundColor: "#33333344",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: theme.border }}>+15s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={removeRest}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    backgroundColor: "#33333344",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: theme.border }}>-15s</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <Ionicons name="chevron-forward" size={28} color={theme.border} />
      </IButton>

      {/* Label under button in home mode if activeSession exists */}
      {typeOfView === "home" && activeSession && (
        <Text
          style={{
            marginTop: 6,
            color: theme.text,
            fontSize: 14,
          }}
        >
          On Going Workout: {formatTime(sessionTime)}
        </Text>
      )}
    </Animated.View>
  );
}
