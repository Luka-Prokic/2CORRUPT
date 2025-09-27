import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import SettingsButton from "../ui/buttons/SettingsButton";
import { Ionicons } from "@expo/vector-icons";
import IList from "../ui/IList";
import { Fragment } from "react";
import { Text } from "react-native";


export default function AppearanceSettings() {
  const { theme, themeName, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const TOGGLE_BUTTONS = [
    {
      title: t("settings.appearance"),
      onPress: toggleTheme,
      info: themeName === "dark" ? t("theme.dark") : t("theme.light"),
      icon: themeName === "dark" ? "moon" : "sunny",
    },
  ];

  return (
    <Fragment>
      <IList
        label={t("theme.theme")}
        background={theme.primaryBackground}
        hrStart="Custom"
      >
        {TOGGLE_BUTTONS.map((item: any, index: number) => (
          <SettingsButton
            key={index}
            title={item.title}
            onPress={item.onPress}
            info={item.info}
            icon={
              <Ionicons name={item.icon as any} size={24} color={theme.text} />
            }
          />
        ))}
      </IList>

      <Text
        style={{
          color: theme.grayText,
          fontSize: 13,
          opacity: 0.7,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {t("dialog.click-to-toggle")}
      </Text>
    </Fragment>
  );
}
