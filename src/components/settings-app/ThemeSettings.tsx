import { themeOrder, useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { Themes } from "../../config/constants/Colors";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { ExpandableBubble } from "../ui/containers/ExpendableBubble";
import { MidText } from "../ui/text/MidText";
import { FlatList } from "react-native-gesture-handler";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";

export function ThemeSettings() {
  const { t } = useTranslation();
  return (
    <ExpandableBubble
      expandedHeight={64 + 44 * themeOrder.length}
      expendedChildren={<ThemeOptions />}
    >
      <MidText
        text={t(`settings.choose-theme`)}
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

function ThemeOptions() {
  const { themeName, setTheme, theme } = useSettingsStore();
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
    <FlatList
      data={themeArray}
      scrollEnabled={false}
      style={{ width: "100%", paddingTop: 64 }}
      renderItem={({ item, index }) => (
        <StrobeOptionButton
          key={index}
          title={`${item.emoji} ${t(`theme.${item.name}`)}`}
          onPress={() => setTheme(item.name)}
          height={44}
          style={{
            backgroundColor: hexToRGBA(
              theme.text,
              themeName === item.name ? 0.1 : 0
            ),
          }}
          strobeDisabled={themeName !== item.name}
        />
      )}
    />
  );
}
