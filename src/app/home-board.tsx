import { Fragment } from "react";
import { useSettingsStore } from "../stores/settingsStore";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { CorruptHeader } from "../components/corrupt/CorruptHeader";
import { WidgetGrid } from "../components/board-home/WidgetGrid";

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

      <ScreenContent
        edges={["top"]}
        scroll={true}
        style={{ backgroundColor: theme.background }}
      >
        <WidgetGrid />
      </ScreenContent>
    </Fragment>
  );
}
