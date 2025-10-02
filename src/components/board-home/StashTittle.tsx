import React from "react";
import { Animated } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import { useTranslation } from "react-i18next";
import useFlickerAnim from "../../animations/useFlickerAnim";
import { useDracoFont } from "../../hooks/useDracoFont";

interface StashTittleProps {
  fontSize?: number;
}

export default function StashTittle({ fontSize = 28 }: StashTittleProps) {
  const { theme, themeName } = useThemeStore();
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
      }}
    >
      {t("app.corrupt")}
    </Animated.Text>
  );
}
