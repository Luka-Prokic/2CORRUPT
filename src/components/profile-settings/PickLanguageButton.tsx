import React from "react";
import { useTheme } from "../../config/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n, { LANGUAGES_COUNT, languageArray } from "../../config/i18n";
import DropDownButton from "../ui/buttons/DropDownButton";
import OptionButton from "../ui/buttons/OptionButton";
import Icon from "react-native-ico-flags";
import { View } from "react-native";

export default function PickLanguageButton() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ marginTop: 16 }}>
      <DropDownButton
        snapPoints={[44, 44 + 44 * LANGUAGES_COUNT]}
        initialText={
          i18n.language === "en" ? t("language.english") : t("language.serbian")
        }
        expandedText={t("settings.choose-language")}
        style={{ backgroundColor: theme.primaryBackground }}
      >
        {languageArray.map((item: any, index: number) => (
          <OptionButton
            key={index}
            title={t(`language.${item.code === "en" ? "english" : "serbian"}`)}
            onPress={item.onPress}
            height={44}
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
    </View>
  );
}
