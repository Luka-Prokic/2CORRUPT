import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settings";

export default function TemplatesScreen() {
  const { theme } = useSettingsStore();

  function headerLeft() {
    return null;
  }

  function headerTitle() {
    return null;
  }
  function headerRight() {
    return null;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerRight: headerRight,
        }}
      />
      <ScreenContent edges={["top"]} scroll={false}>
        <Text style={{ color: theme.text, fontSize: 36 }}>Edit Split</Text>
      </ScreenContent>
    </Fragment>
  );
}
