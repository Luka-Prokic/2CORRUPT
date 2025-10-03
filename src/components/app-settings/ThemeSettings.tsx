import React from "react";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { Themes } from "../../config/constants/Colors";
import Colors from "../../config/constants/Colors";
import DropDownButton from "../ui/buttons/DropDownButton";
import OptionButton from "../ui/buttons/OptionButton";
import hexToRGBA from "../../features/HEXtoRGB";
import IList from "../ui/containers/IList";

export default function ThemeSettings() {
  const { themeName, setTheme } = useSettingsStore();
  const theme = Colors[themeName];
  const { t } = useTranslation();

  const themeArray: { name: Themes; displayName: string; emoji: string }[] = [
    { name: "light", displayName: "Light", emoji: "☀️" },
    { name: "oldschool", displayName: "Old School", emoji: "💪" },
    { name: "peachy", displayName: "Peachy", emoji: "🍑" },
    { name: "dark", displayName: "Dark", emoji: "🌙" },
    { name: "preworkout", displayName: "Preworkout", emoji: "⚡" },
    { name: "Corrupted", displayName: "Corrupted", emoji: "💸" },
  ];

  return (
    <IList label={t("settings.choose-theme")}>
      <DropDownButton
        snapPoints={[44, 308]}
        initialText={t(`theme.${themeName}`)}
        expandedText={t("settings.choose-theme")}
        style={{ backgroundColor: theme.secondaryBackground }}
      >
        {themeArray.map((item, index: number) => (
          <OptionButton
            key={index}
            title={`${item.emoji} ${t(`theme.${item.name}`)}`}
            onPress={() => setTheme(item.name)}
            height={44}
            style={
              themeName === item.name
                ? { backgroundColor: hexToRGBA(theme.text, 0.1) }
                : {}
            }
            color={themeName === item.name ? theme.tint : theme.text}
          />
        ))}
      </DropDownButton>
    </IList>
  );
}
