import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { NoSplit } from "../../stores/workout";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenView } from "../../components/ui/containers/ScreenView";

export default function TemplatesScreen() {
  const insets = useSafeAreaInsets();
  const split = NoSplit;

  function headerLeft() {
    return null;
  }

  function headerRight() {
    return null;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: split.name,
          headerLeft,
          headerRight,
        }}
      />
      <ScreenContent>
        <ScreenView></ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
