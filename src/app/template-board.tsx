import { Fragment, useState } from "react";
import {
  SessionDashboard,
  SessionSheetType,
} from "../components/board-workout/SessionDashboard";
import { TemplateBoardHeader } from "../components/board-template/TemplateBoardHeader";
import { Stack } from "expo-router";

export default function TemplateBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<SessionSheetType>("session");

  return (
    <Fragment>
      <Stack.Screen
        options={{ header: () => <TemplateBoardHeader listOpen={listOpen} /> }}
      />

      <SessionDashboard
        listOpen={listOpen}
        listType={listType}
        setListOpen={setListOpen}
        setListType={setListType}
      />
    </Fragment>
  );
}
