import { ThemeSettings } from "../components/settings-app/ThemeSettings";
import { IList } from "../components/ui/containers/IList";
import { LanguageSettings } from "../components/settings-app/LanguageSettings";
import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.settings"),
          headerBlurEffect: "none",
          headerTransparent: true,
        }}
      />

      <ScreenContent
        edges={["top", "bottom"]}
        style={{ backgroundColor: theme.navBackground }}
      >
        <IList style={{ gap: 16, paddingHorizontal: 16 }} hrStart="None">
          <ThemeSettings />

          <LanguageSettings />
        </IList>
      </ScreenContent>
    </Fragment>
  );
}
