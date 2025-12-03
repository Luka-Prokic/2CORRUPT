import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../utils/Dimensions";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { IText } from "../ui/text/IText";

export function QuickStartSelect() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t } = useTranslation();
  const { startSession } = useWorkoutStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "session",
      },
    });
    setTypeOfView("workout");
    startSession();
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        width: WIDTH - 32,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.primaryBackground,
      }}
      strobeColors={[theme.handle, theme.handle, theme.handle, theme.handle]}
    >
      <IText
        text={t("workout-view.quick-start")}
        color={theme.fifthBackground}
      />
    </StrobeButton>
  );
}
