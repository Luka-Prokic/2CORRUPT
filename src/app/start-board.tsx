import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { ModalBackButton } from "./_layout";

export default function StartBoard() {
  return (
    <Fragment>
      <Stack.Screen options={{ headerLeft: () => <ModalBackButton /> }} />

      <ScreenContent edges={["top", "bottom"]} scroll={true}></ScreenContent>
    </Fragment>
  );
}
