import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { Text } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { useTranslation } from "react-i18next";

export function PlanedSessionSelect() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {}

  return null; // remove when u implement plans

  return (
    <IButton
      onPress={handlePress}
      color={theme.primaryBackground}
      style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
    >
      <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
        {t("workout-view.planned-session")}
      </Text>
    </IButton>
  );
}
