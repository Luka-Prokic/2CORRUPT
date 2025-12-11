import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { FlatList } from "react-native-gesture-handler";
import { workoutSettingsConfig } from "../../config/settings/workoutSettings";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { DescriptionText } from "../../components/ui/text/DescriptionText";
import { SettingsField } from "../../components/ui/settings-fields/SettingsField";
import { IText } from "../../components/ui/text/IText";

export default function WorkoutScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => <IText text={t("settings.workout")} />,
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ScreenView style={{ paddingHorizontal: 16, gap: 16 }}>
          <DescriptionText text={t("settings.workout-settings.description")} />
          <FlatList
            data={workoutSettingsConfig}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => <SettingsField setting={item} />}
            ListFooterComponent={<EmptyFooter />}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
