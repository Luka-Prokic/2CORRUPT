import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { DevTest } from "../components/all-screen/DevTest";
import { Stack } from "expo-router";

//Now is used for testing purposes (session history)
export default function AllScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{}} />
      <ScreenContent scroll={false}>
        <DevTest />
      </ScreenContent>
    </Fragment>
  );
}
