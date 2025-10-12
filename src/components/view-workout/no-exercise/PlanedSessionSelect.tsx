import { Fragment } from "react";
import { IButton } from "../../ui/buttons/IButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { View, Text } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { NoExerciseViewSelected } from "../NoExerciseView";

interface PlanedSessionSelectProps {
  plannedSession?: boolean; //for ui mockup
  onSelect: (selected: NoExerciseViewSelected) => void;
  selected: NoExerciseViewSelected;
}

export function PlanedSessionSelect({
  plannedSession = false,
  onSelect,
  selected,
}: PlanedSessionSelectProps) {
  const { theme } = useSettingsStore();

  function handlePress() {
    onSelect("planed-session");
  }

  if (plannedSession && selected === "none")
    return (
      <IButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          marginHorizontal: 16,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: theme.grayText }}
        >
          Planed Session {/* mock */}
        </Text>
      </IButton>
    );

  return null;
}
