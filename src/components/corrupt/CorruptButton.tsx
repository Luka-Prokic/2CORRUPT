import { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";
import { IButton } from "../ui/buttons/IButton";
import { CorruptTittle } from "./CorruptTittle";
import { Animated } from "react-native";
import { HEIGHT } from "../../features/Dimensions";
import { router } from "expo-router";

export function CorruptButton() {
  const { theme } = useSettingsStore();
  const { typeOfView } = useUIStore();

  const CorruptButtonBottom = useRef(
    new Animated.Value(HEIGHT / 2 - 136)
  ).current;

  useEffect(() => {
    if (typeOfView === "home") {
      Animated.spring(CorruptButtonBottom, {
        toValue: HEIGHT / 2 - 156,
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(CorruptButtonBottom, {
        toValue: 22,
        speed: 2,
        bounciness: 5,
        useNativeDriver: false,
      }).start();
    }
  }, [typeOfView]);

  const handleCorruptPress = () => {
    if (typeOfView === "workout") {
      router.push("/workout-board");
    } else if (typeOfView === "template") {
      // router.push("/template-board"); TODO: add new boeard only if needed
      router.push("/workout-board");
    } else if (typeOfView === "start") {
      // router.push("/start-board");  TODO: add new boeard only if needed
      router.push("/workout-board");
    } else {
      router.push("/home-board");
    }
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 16,
          zIndex: 10,
        },
        {
          bottom: CorruptButtonBottom,
        },
      ]}
    >
      <IButton
        onPress={handleCorruptPress}
        style={{
          width: "100%",
          height: 64,
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
