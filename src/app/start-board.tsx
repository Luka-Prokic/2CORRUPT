import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { ModalBackButton } from "./_layout";
import { TemplatesCardList } from "../components/templates/TemplatesCardList";
import { ScreenView } from "../components/ui/containers/ScreenView";

export default function StartBoard() {
  return (
    <Fragment>
      <Stack.Screen options={{ headerLeft: () => <ModalBackButton /> }} />

      <ScreenContent edges={["top", "bottom"]} scroll={true}>
        <ScreenView>
          <TemplatesCardList />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
