import { OptionButton } from "../../ui/buttons/OptionButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export function SwapExerciseButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <OptionButton
      title={t("workout-board.swap-exercise")}
      icon={
        <Ionicons name="swap-vertical-outline" size={24} color={theme.text} />
      }
      height={44}
      onPress={() => {
        router.push("/swap-exercise");
      }}
    />
  );
}
