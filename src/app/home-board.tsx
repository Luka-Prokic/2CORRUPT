import { Fragment } from "react";
import { useSettingsStore } from "../stores/settingsStore";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { CorruptHeader } from "../components/corrupt/CorruptHeader";
import { WidgetGrid } from "../components/board-home/WidgetGrid";
import { ScreenView } from "../components/ui/containers/ScreenView";

export default function HomeBoard() {
  const { theme } = useSettingsStore();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <Fragment />,
          headerTitle: () => <CorruptHeader />,
        }}
      />

      <ScreenContent scroll={false}>
        <ScreenView>
          <WidgetGrid />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
