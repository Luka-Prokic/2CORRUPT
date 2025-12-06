import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";

export default function GoalsScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("settings.goals"),
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ScreenView style={{ gap: 16, paddingHorizontal: 16 }}></ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
