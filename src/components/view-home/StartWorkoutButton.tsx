import { useSettingsStore } from "../../stores/settingsStore";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { Text } from "react-native";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { BounceButton } from "../ui/buttons/BounceButton";
import { HEIGHT } from "../../features/Dimensions";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";

export function StartWorkoutButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { setTypeOfView } = useUIStore();
  const { activeSession } = useWorkoutStore();

  const isItActive = activeSession !== null;

  function handleStartWorkout() {
    if (isItActive) {
      setTypeOfView("workout");
    } else {
      setTypeOfView("start");
    }
  }

  return (
    <BounceButton
      onPress={handleStartWorkout}
      style={{
        height: 64,
        borderRadius: 100,
        marginHorizontal: 16,
        bottom: HEIGHT / 2,
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
      }}
      color={hexToRGBA(theme.accent, 0.2)}
    >
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        style={{ width: "100%", height: "100%" }}
        duration={5000}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>
          {isItActive ? t("app.continue-workout") : t("app.start-workout")}
        </Text>
      </StrobeBlur>
    </BounceButton>
  );
}
