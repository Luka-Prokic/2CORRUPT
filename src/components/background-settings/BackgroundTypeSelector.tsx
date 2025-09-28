import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import IList from "../ui/containers/IList";
import OptionButton from "../ui/buttons/OptionButton";
import { useBackgroundStore } from "../../stores/backgroundStore";
import { Ionicons } from "@expo/vector-icons";

export default function BackgroundTypeSelector() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { type, setType } = useBackgroundStore();

  return (
    <IList
      label={t("settings.backgroundType")}
      background={theme.primaryBackground}
    >
      <OptionButton
        title={t("settings.blank")}
        height={44}
        onPress={() => setType("blank")}
        icon={
          <Ionicons
            name={type === "blank" ? "radio-button-on" : "radio-button-off"}
            size={20}
            color={theme.tint}
          />
        }
      />
      <OptionButton
        title={t("settings.grid")}
        height={44}
        onPress={() => setType("grid")}
        icon={
          <Ionicons
            name={type === "grid" ? "radio-button-on" : "radio-button-off"}
            size={20}
            color={theme.tint}
          />
        }
      />
      <OptionButton
        title={t("settings.dotted")}
        height={44}
        onPress={() => setType("dotted")}
        icon={
          <Ionicons
            name={type === "dotted" ? "radio-button-on" : "radio-button-off"}
            size={20}
            color={theme.tint}
          />
        }
      />
    </IList>
  );
}
