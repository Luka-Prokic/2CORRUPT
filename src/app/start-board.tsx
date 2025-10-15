import { Stack } from "expo-router";
import { TemplateBoardHeader } from "../components/board-template/TemplateBoardHeader";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";

export default function StartBoard() {
  return (
    <Fragment>
      <Stack.Screen
        options={{ headerLeft: () => <TemplateBoardHeader listOpen={false} /> }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={true}></ScreenContent>
    </Fragment>
  );
}
