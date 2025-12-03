import { useSettingsStore } from "../../stores/settingsStore";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { Text } from "react-native";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { BounceButton } from "../ui/buttons/BounceButton";
import { HEIGHT } from "../../utils/Dimensions";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IText } from "../ui/text/IText";

export function StartWorkoutButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { setTypeOfView } = useUIStore();
  const { activeSession, activeTemplate } = useWorkoutStore();
  const isItActive = activeSession !== null;
  const isItEditing = activeTemplate !== null;
  const insets = useSafeAreaInsets();
  function handleStartWorkout() {
    if (isItActive) {
      setTypeOfView("workout");
    } else if (isItEditing) {
      setTypeOfView("template");
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
        bottom: HEIGHT / 2 - insets.bottom,
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
      }}
      color={hexToRGBA(theme.accent, 0.2)}
    >
      <StrobeBlur
        colors={[
          theme.caka,
          theme.secondaryBackground,
          theme.accent,
          theme.tint,
        ]}
        style={{ width: "100%", height: "100%" }}
        duration={5000}
      >
        <IText
          text={
            isItActive
              ? t("app.continue-workout")
              : isItEditing
              ? t("app.continue-template")
              : t("app.start-workout")
          }
          color={theme.text}
        />
      </StrobeBlur>
    </BounceButton>
  );
}
