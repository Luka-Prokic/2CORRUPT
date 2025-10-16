import { Fragment, useState } from "react";
import { Stack } from "expo-router";
import { TemplateBoardHeaderLeft } from "../components/board-template/header/TemplateBoardHeaderLeft";
import {
  TemplateDashboard,
  TemplateSheetType,
} from "../components/board-template/TemplateDashboard";
import { ScreenContent } from "../components/ui/utils/ScreenContent";

export default function TemplateBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<TemplateSheetType>("template");

  return (
    <Fragment>
      <Stack.Screen
        options={{ headerLeft: () => <TemplateBoardHeaderLeft /> }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <TemplateDashboard
          listOpen={listOpen}
          listType={listType}
          setListOpen={setListOpen}
          setListType={setListType}
        />
      </ScreenContent>
    </Fragment>
  );
}
