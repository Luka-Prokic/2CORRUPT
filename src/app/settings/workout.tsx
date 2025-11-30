import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { FlatList } from "react-native-gesture-handler";
import { WorkoutSettingsField } from "../../components/settings-app/workout/WorkoutSettingsField";
import { workoutSettingsConfig } from "../../config/settings/workoutSettings";
import { WorkoutSettingsNumberField } from "../../components/settings-app/workout/WorkoutNumberField";
import { WorkoutSettingsIncrementField } from "../../components/settings-app/workout/WorkoutIncrementField";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";

export default function WorkoutScreen() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.workout"),
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent style={{ backgroundColor: theme.navBackground }}>
        <ScreenView style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={workoutSettingsConfig}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) =>
              item.type === "toggle" ? (
                <WorkoutSettingsField setting={item} />
              ) : item.type === "number" ? (
                <WorkoutSettingsNumberField setting={item} />
              ) : item.type === "increment" ? (
                <WorkoutSettingsIncrementField setting={item} />
              ) : null
            }
            ListFooterComponent={<EmptyFooter />}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
