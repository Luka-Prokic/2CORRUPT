import { ThemeSettings } from "../../components/settings-app/ThemeSettings";
import { LanguageSettings } from "../../components/settings-app/LanguageSettings";
import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { WorkoutButton } from "../../components/settings-app/WorkoutButton";
import { GoalsButton } from "../../components/settings-app/GoalsButton";
import { UnitsSettings } from "../../components/settings-app/UnitsSettings";
import { IBubble } from "../../components/ui/containers/IBubble";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { GeneralButton } from "../../components/settings-app/GeneralButton";
import { IText } from "../../components/ui/text/IText";

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => <IText text={t("navigation.settings")} />,
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ScreenView style={{ gap: 8, paddingHorizontal: 16 }}>
          <IBubble size="flexible">
            <GeneralButton />
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
