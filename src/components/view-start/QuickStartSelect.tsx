import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";
import { StrobeButton } from "../ui/buttons/StrobeButton";

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
    >
      <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
        {t("workout-view.quick-start")}
      </Text>
    </StrobeButton>
  );
}
