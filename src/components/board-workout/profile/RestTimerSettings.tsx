import { useState } from "react";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { Text, View } from "react-native";
import { WIDTH } from "../../../utils/Dimensions";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { SessionSheetType } from "../../../app/workout-board";
import { useFormatTime } from "../../../features/format/useFormatTime";
import { TemplateSheetType } from "../../../app/template-board";

interface RestTimerSettingsProps {
  setSheetType: (sheetType: SessionSheetType | TemplateSheetType) => void;
}

export function RestTimerSettings({ setSheetType }: RestTimerSettingsProps) {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
  const [noRest, setNoRest] = useState(activeExercise?.noRest ?? false);
  const { defaultRestTime } = useSettingsStore();
  const restTime = activeExercise?.restTime ?? defaultRestTime ?? 180;

  function handleNoRestToggle() {
    const newNoRest = !noRest;

    setNoRest(newNoRest);
    updateActiveExercise({
      noRest: newNoRest,
    });
  }

  function handleRestTimePress() {
    setSheetType("rest");
  }

  const formattedTime = useFormatTime({ seconds: restTime, format: "auto+" });

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        height: 34,
        width: WIDTH * 0.5 - 16,
        borderRadius: 22,
        overflow: "hidden",
        marginLeft: 16,
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
          width: WIDTH * 0.5 - 68,
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
            {formattedTime}
          </Text>
        </View>
      </BounceButton>
    </View>
  );
}
