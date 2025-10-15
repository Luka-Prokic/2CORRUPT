import { useRef, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";
import { IButton } from "../ui/buttons/IButton";
import { CorruptTittle } from "./CorruptTittle";
import { Animated } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CORRUPT_BUTTON_FROM_BOTTOM = 22;
export const CORRUPT_BUTTON_HEIGHT = 64;

const CORRUPT_GAP = 8;

export const CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM =
  CORRUPT_BUTTON_FROM_BOTTOM + CORRUPT_BUTTON_HEIGHT;

export function CorruptButton() {
  const { theme } = useSettingsStore();
  const { typeOfView } = useUIStore();
  const insets = useSafeAreaInsets();
  const CorruptButtonBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue =
      typeOfView === "home"
        ? HEIGHT / 2 - CORRUPT_BUTTON_HEIGHT - CORRUPT_GAP
        : CORRUPT_BUTTON_FROM_BOTTOM + insets.bottom;
    if (typeOfView === "home") {
      Animated.spring(CorruptButtonBottom, {
        toValue: toValue,
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(CorruptButtonBottom, {
        toValue: toValue,
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }).start();
    }
  }, [typeOfView]);

  const handleCorruptPress = useMemo(
    () => () => {
      router.push(`/${typeOfView}-board`);
    },
    [typeOfView]
  );

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          width: WIDTH,
          height: CORRUPT_BUTTON_HEIGHT,
          alignItems: "center",
          paddingHorizontal: 16,
          zIndex: 10,
          bottom: CorruptButtonBottom,
        },
      ]}
    >
      <IButton
        onPress={handleCorruptPress}
        style={{
          width: WIDTH - 32,
          height: CORRUPT_BUTTON_HEIGHT,
          borderRadius: 100,
          backgroundColor: theme.accent,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <CorruptTittle style={{ color: theme.border, fontSize: 22 }} />
        <Ionicons name="chevron-forward" size={28} color={theme.border} />
      </IButton>
    </Animated.View>
  );
}
