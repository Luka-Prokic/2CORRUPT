import React from "react";
import { useThemeStore } from "../../stores/themeStore";
import Colors from "../../config/constants/Colors";
import { useTranslation } from "react-i18next";
import i18n, { LANGUAGES_COUNT, languageArray } from "../../config/i18n";
import DropDownButton from "../ui/buttons/DropDownButton";
import OptionButton from "../ui/buttons/OptionButton";
import Icon from "react-native-ico-flags";
import hexToRGBA from "../../hooks/HEXtoRGB";
import IList from "../ui/containers/IList";

export default function PickLanguageSettings() {
  const { themeName } = useThemeStore(); const theme = Colors[themeName];
  const { t } = useTranslation();

  return (
    <IList label={t("settings.choose-language")}>
      <DropDownButton
        snapPoints={[44, 44 + 44 * LANGUAGES_COUNT]}
        initialText={
          i18n.language === "en" ? t("language.english") : t("language.serbian")
        }
        expandedText={t("settings.choose-language")}
        style={{ backgroundColor: theme.secondaryBackground }}
      >
        {languageArray.map((item: any, index: number) => (
          <OptionButton
            key={index}
            title={t(`language.${item.code === "en" ? "english" : "serbian"}`)}
            onPress={item.onPress}
            height={44}
            style={
              i18n.language === item.code
                ? { backgroundColor: hexToRGBA(theme.text, 0.1) }
                : {}
            }
            color={item.code === i18n.language ? theme.tint : theme.text}
            icon={
              <Icon
                name={item.code === "en" ? "united-kingdom" : "serbia"}
                width={24}
                height={24}
              />
            }
          />
        ))}
      </DropDownButton>
    </IList>
  );
}
