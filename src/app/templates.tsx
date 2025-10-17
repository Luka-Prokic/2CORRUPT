import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";

export default function TemplatesScreen() {
  return (
    <Fragment>
      <Stack.Screen />
      <ScreenContent edges={["top"]} scroll={false}></ScreenContent>
    </Fragment>
  );
}
