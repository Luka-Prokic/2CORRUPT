import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export function NoSearchMatchTempaltes() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <Animated.Text
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        fontSize: 18,
        fontWeight: "600",
        color: theme.grayText,
        textAlign: "center",
      }}
    >
      {t("templates.no-templates-found-match")}
    </Animated.Text>
  );
}
