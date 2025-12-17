import { Animated, TextStyle, StyleProp } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useFlickerAnim } from "../../animations/useFlickerAnim";
import { useDracoFont } from "../../features/fonts/useDracoFont";

interface CorruptTittleProps {
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

export function CorruptTittle({ fontSize = 28, style }: CorruptTittleProps) {
  const { theme, themeName } = useSettingsStore();
  const { t } = useTranslation();
  const { fontFamily } = useDracoFont();
  const flickerAnim = useFlickerAnim();

  const opacity = themeName === "Corrupted" ? flickerAnim : 1;
  const color =
    themeName === "preworkout"
      ? theme.caka
      : themeName === "peachy"
      ? theme.fourthBackground
      : themeName === "oldschool"
      ? theme.error
      : themeName === "light"
      ? theme.accent
      : theme.text;

  return (
    <Animated.Text
      key={themeName}
      style={{
        fontFamily,
        fontSize,
        opacity,
        color,
        textAlign: "center",
        ...(style as TextStyle),
      }}
      numberOfLines={1}
      adjustsFontSizeToFit={true}
      minimumFontScale={0.5}
    >
      {t("app.corrupt")}
    </Animated.Text>
  );
}
