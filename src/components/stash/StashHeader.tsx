import React from "react";
import { Animated } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import Colors from "../../config/constants/Colors";
import { useTranslation } from "react-i18next";
import { useUnifrakturCookFont } from "../../hooks/useUnifrakturCookFont";
import useFlickerAnim from "../../animations/useFlickerAnim";

export default function StashHeader() {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
  const { t } = useTranslation();
  const { fontFamily } = useUnifrakturCookFont();
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
      style={{
        fontWeight: "bold",
        fontFamily,
        fontSize: 36,
        opacity,
        color,
      }}
    >
      {t("app.corrupt")}
    </Animated.Text>
  );
}
