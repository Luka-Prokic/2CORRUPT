import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import IList from "../ui/containers/IList";
import OptionButton from "../ui/buttons/OptionButton";
import { useBackgroundStore } from "../../stores/backgroundStore";
import { Ionicons } from "@expo/vector-icons";

export default function DotSettings() { 
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { type, dotSize, dotSpacing } = useBackgroundStore();

  if (type !== "dotted") {
    return null;
  }

  return (
    <IList
      label={t("settings.dotSettings")}
      background={theme.primaryBackground}
    >
      <OptionButton
        title={`${t("settings.dotSize")}: ${dotSize}px`}
        height={44}
        onPress={() => {
          // TODO: Open slider or input
          console.log("Dot size picker");
        }}
        icon={<Ionicons name="resize" size={20} color={theme.tint} />}
      />
      <OptionButton
        title={`${t("settings.dotSpacing")}: ${dotSpacing}px`}
        height={44}
        onPress={() => {
          // TODO: Open slider or input
          console.log("Dot spacing picker");
        }}
        icon={<Ionicons name="resize" size={20} color={theme.tint} />}
      />
    </IList>
  );
}
