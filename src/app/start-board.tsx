import { Stack } from "expo-router";
import { TemplateBoardHeaderLeft } from "../components/board-template/header/TemplateBoardHeaderLeft";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";

export default function StartBoard() {
  return (
    <Fragment>
      <Stack.Screen
        options={{ headerLeft: () => <TemplateBoardHeaderLeft /> }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={true}></ScreenContent>
    </Fragment>
  );
}
