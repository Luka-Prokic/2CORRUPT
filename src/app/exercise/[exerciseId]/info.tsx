import { Fragment } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";

export default function ExerciseListScreen() {
  const { theme } = useSettingsStore();

  return (
    <Fragment>
      <Stack.Screen options={{}} />

      <ScreenContent edges={["top"]} scroll={true}></ScreenContent>
    </Fragment>
  );
}
