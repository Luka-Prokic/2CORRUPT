import { Fragment } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "./ScreenContent";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen options={{}} />

      <ScreenContent edges={["bottom"]}></ScreenContent>
    </Fragment>
  );
}
