import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { Text } from "react-native";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";

export function QuickStartSelect() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t } = useTranslation();
  const { startSession } = useWorkoutStore();

  function handlePress() {
    router.push("/add-exercise");
    setTypeOfView("workout");
    startSession();
  }

  return (
    <IButton
      onPress={handlePress}
      color={theme.primaryBackground}
      style={{
        width: WIDTH - 32,
        height: 64,
        borderRadius: 32,
      }}
    >
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        tint="light"
        style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
      >
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          {t("workout-view.quick-start")}
        </Text>
      </StrobeBlur>
    </IButton>
  );
}
