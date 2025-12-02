import { themeOrder, useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { Themes } from "../../config/constants/Colors";
import { ExpandableBubble } from "../ui/containers/ExpendableBubble";
import { MidText } from "../ui/text/MidText";
import { FlatList } from "react-native-gesture-handler";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { useState } from "react";

const THEME_ARRAY: readonly {
  name: Themes;
  displayName: string;
  emoji: string;
}[] = [
  { name: "light", displayName: "Light", emoji: "☀️" },
  { name: "oldschool", displayName: "Old School", emoji: "💪" },
  { name: "peachy", displayName: "Peachy", emoji: "🍑" },
  { name: "dark", displayName: "Dark", emoji: "🌙" },
  { name: "preworkout", displayName: "Preworkout", emoji: "⚡" },
  { name: "Corrupted", displayName: "Corrupted", emoji: "💸" },
];

export function ThemeSettings() {
  const { t } = useTranslation();
  const { themeName, setTheme } = useSettingsStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandableBubble
      expandedHeight={64 + 44 * themeOrder.length}
      collapsedHeight={108}
      onToggle={() => setExpanded(!expanded)}
    >
      <MidText text={t(`settings.change-theme`)} style={{ lineHeight: 64 }} />
      <FlatList
        data={THEME_ARRAY}
        scrollEnabled={false}
        style={{ width: "100%" }}
        renderItem={({ item, index }) =>
          expanded || themeName === item.name ? (
            <StrobeOptionButton
              key={index}
              title={`${item.emoji} ${t(`theme.${item.name}`)}`}
              onPress={() => setTheme(item.name)}
              height={44}
              strobeDisabled={themeName !== item.name}
              styleContent={{ paddingHorizontal: 16 }}
              disabled={!expanded}
            />
          ) : null
        }
      />
    </ExpandableBubble>
  );
}
