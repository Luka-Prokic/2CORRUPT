import { ThemeSettings } from "../../components/settings-app/ThemeSettings";
import { IList } from "../../components/ui/containers/IList";
import { LanguageSettings } from "../../components/settings-app/LanguageSettings";
import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";

export default function SettingsScreen() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.settings"),
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent
        edges={["bottom"]}
        style={{ backgroundColor: theme.navBackground }}
      >
        <ScreenView style={{ gap: 16, paddingHorizontal: 16 }}>
          <ThemeSettings />

          <LanguageSettings />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
