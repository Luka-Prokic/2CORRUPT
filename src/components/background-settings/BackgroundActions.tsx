import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import IList from "../ui/containers/IList";
import OptionButton from "../ui/buttons/OptionButton";
import { useBackgroundStore } from "../../stores/backgroundStore";
import { Ionicons } from "@expo/vector-icons";


export default function BackgroundActions() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { resetToDefaults } = useBackgroundStore();

  return (
    <IList label={t("settings.actions")} background={theme.primaryBackground}>
      <OptionButton
        title={t("settings.resetToDefaults")}
        height={44}
        onPress={resetToDefaults}
        icon={<Ionicons name="refresh" size={20} color={theme.tint} />}
      />
    </IList>
  );
}
