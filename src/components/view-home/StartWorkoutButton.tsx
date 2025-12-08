import { useSettingsStore } from "../../stores/settingsStore";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
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
  const insets = useSafeAreaInsets();

  const isItActive = activeSession !== null;
  const isItEditing = activeTemplate !== null;

  function handlePress() {
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
      onPress={handlePress}
      style={{
        height: 64,
        borderRadius: 32,
        marginHorizontal: 16,
        bottom: HEIGHT / 2 - insets.bottom,
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
      }}
      haptics
    >
      <StrobeBlur
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.tint,
        }}
      >
        <IText
          text={
            isItActive
              ? t("app.continue-workout")
              : isItEditing
              ? t("app.continue-template")
              : t("app.start-workout")
          }
          color={theme.border}
        />
      </StrobeBlur>
    </BounceButton>
  );
}
