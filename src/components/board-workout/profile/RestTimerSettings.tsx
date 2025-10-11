import { useState } from "react";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { Text, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { SessionListType } from "../SessionDashboard";

interface RestTimerSettingsProps {
  openPanel: () => void;
  setListType: (listType: SessionListType) => void;
}

export function RestTimerSettings({
  openPanel,
  setListType,
}: RestTimerSettingsProps) {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
  const [noRest, setNoRest] = useState(activeExercise?.noRest ?? false);
  const restTime = activeExercise?.restTime ?? 180;

  const minutes = String(Math.floor(restTime / 60));
  const seconds = String(restTime % 60).padStart(2, "0");

  function handleNoRestToggle() {
    const newNoRest = !noRest;

    setNoRest(newNoRest);
    updateActiveExercise({
      noRest: newNoRest,
    });
  }

  function handleRestTimePress() {
    setListType("rest");
    openPanel();
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        height: 34,
        width: WIDTH * 0.5 - 20,
        borderRadius: 22,
        overflow: "hidden",
      }}
    >
      <BounceButton
        style={{
          height: 34,
          width: 44,
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
          backgroundColor: hexToRGBA(theme.grayText, noRest ? 1 : 0.5),
        }}
        onPress={handleNoRestToggle}
      >
        <Ionicons
          name={noRest ? "checkmark" : "close"}
          size={24}
          color={noRest ? theme.secondaryText : theme.text}
        />
      </BounceButton>
      <BounceButton
        style={{
          height: 34,
          width: WIDTH * 0.5 - 72,
          borderTopRightRadius: 22,
          borderBottomRightRadius: 22,
          backgroundColor: hexToRGBA(theme.grayText, 0.4),
        }}
        disabled={noRest}
        onPress={handleRestTimePress}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            height: 34,
            width: WIDTH * 0.5 - 72,
          }}
        >
          <Ionicons name="stopwatch-outline" size={24} color={theme.text} />
          <Text
            style={{
              color: theme.text,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {minutes}min{seconds != "00" ? ` ${seconds}s` : ""}
          </Text>
        </View>
      </BounceButton>
    </View>
  );
}
