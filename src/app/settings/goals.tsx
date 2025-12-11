import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { IText } from "../../components/ui/text/IText";

export default function GoalsScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => <IText text={t("settings.goals")} />,
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ScreenView style={{ gap: 16, paddingHorizontal: 16 }}></ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
