import { WIDTH } from "../../../features/Dimensions";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";

export function AddSetButton() {
  const { theme } = useSettingsStore();
  const { addSetToActiveExercise, activeTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  const handleAddSet = () => {
    addSetToActiveExercise();
  };

  return (
    <BounceButton
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 64,
        width: WIDTH - 32,
        borderRadius: 32,
      }}
      color={activeTemplate ? theme.grayText : theme.tint}
      onPress={handleAddSet}
    >
      <StrobeBlur
        colors={[
          theme.text,
          theme.secondaryText,
          theme.background,
          theme.primaryBackground,
        ]}
        tint="light"
        style={{
          height: 64,
          width: WIDTH - 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {t("workout-view.add-set")}
        </Text>
      </StrobeBlur>
    </BounceButton>
  );
}
