import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import IList from "../ui/containers/IList";
import OptionButton from "../ui/buttons/OptionButton";
import { useBackgroundStore } from "../../stores/backgroundStore";
import { Ionicons } from "@expo/vector-icons";

export default function BackgroundColorSettings() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { type, color, lineColor, dotColor } = useBackgroundStore();

  return (
    <IList label={t("settings.colors")} background={theme.primaryBackground}>
      <OptionButton
        title={`${t("settings.backgroundColor")}: ${color}`}
        height={44}
        onPress={() => {
          // TODO: Open color picker
          console.log("Background color picker");
        }}
        icon={<Ionicons name="color-palette" size={20} color={theme.tint} />}
      />
      {type === "grid" && (
        <OptionButton
          title={`${t("settings.lineColor")}: ${lineColor}`}
          height={44}
          onPress={() => {
            // TODO: Open color picker
            console.log("Line color picker");
          }}
          icon={
            <Ionicons name="color-palette" size={20} color={theme.tint} />
          }
        />
      )}
      {type === "dotted" && (
        <OptionButton
          title={`${t("settings.dotColor")}: ${dotColor}`}
          height={44}
          onPress={() => {
            // TODO: Open color picker
            console.log("Dot color picker");
          }}
          icon={
            <Ionicons name="color-palette" size={20} color={theme.tint} />
          }
        />
      )}
    </IList>
  );
}
