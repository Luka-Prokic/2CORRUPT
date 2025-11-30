import { ThemeSettings } from "../../components/settings-app/ThemeSettings";
import { LanguageSettings } from "../../components/settings-app/LanguageSettings";
import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { WorkoutButton } from "../../components/settings-app/WorkoutButton";
import { GoalsButton } from "../../components/settings-app/GoalsButton";
import { UnitsSettings } from "../../components/settings-app/UnitsSettings";
import { IBubble } from "../../components/ui/containers/IBubbleView";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";

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

      <ScreenContent style={{ backgroundColor: theme.navBackground }}>
        <ScreenView style={{ gap: 8, paddingHorizontal: 16 }}>
          <IBubble height={128}>
            <WorkoutButton />
            <GoalsButton />
          </IBubble>

          <UnitsSettings />

          <ThemeSettings />

          <LanguageSettings />
          <EmptyFooter />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
