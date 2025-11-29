import { useTranslation } from "react-i18next";
import { LANGUAGES_COUNT, languageArray } from "../../config/i18n";
import { ExpandableBubble } from "../ui/containers/ExpendableBubble";
import { FlatList } from "react-native-gesture-handler";
import i18n from "i18next";
import { MidText } from "../ui/text/MidText";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { useState } from "react";

export function LanguageSettings() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandableBubble
      expandedHeight={64 + 44 * LANGUAGES_COUNT}
      collapsedHeight={64 + 44}
      onToggle={() => setExpanded(!expanded)}
    >
      <MidText
        text={t(`settings.change-language`)}
        style={{
          lineHeight: 64,
        }}
      />
      <FlatList
        data={languageArray}
        scrollEnabled={false}
        style={{ width: "100%" }}
        renderItem={({ item, index }) =>
          expanded || i18n.language === item.code ? (
            <StrobeOptionButton
              key={index}
              title={t(`language.${item.title.toLowerCase()}`)}
              onPress={item.onPress}
              height={44}
              strobeDisabled={i18n.language !== item.code}
            />
          ) : null
        }
      />
    </ExpandableBubble>
  );
}
