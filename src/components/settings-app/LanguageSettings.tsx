import { useTranslation } from "react-i18next";
import { LANGUAGES_COUNT, languageArray } from "../../config/i18n";
import { ExpandableBubble } from "../ui/containers/ExpendableBubble";
import { FlatList } from "react-native-gesture-handler";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useSettingsStore } from "../../stores/settingsStore";
import i18n from "i18next";
import { MidText } from "../ui/text/MidText";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";

export function LanguageSettings() {
  const { t } = useTranslation();

  return (
    <ExpandableBubble
      expandedHeight={64 + 44 * LANGUAGES_COUNT}
      expendedChildren={<LanguageOptions />}
    >
      <MidText
        text={t(`settings.choose-language`)}
        style={{
          lineHeight: 64,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />
    </ExpandableBubble>
  );
}

function LanguageOptions() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <FlatList
      data={languageArray}
      scrollEnabled={false}
      style={{ width: "100%", paddingTop: 64 }}
      renderItem={({ item, index }) => (
        <StrobeOptionButton
          key={index}
          title={t(`language.${item.title.toLowerCase()}`)}
          onPress={item.onPress}
          height={44}
          strobeDisabled={i18n.language !== item.code}
        />
      )}
    />
  );
}
