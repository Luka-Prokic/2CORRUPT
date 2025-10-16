import { Fragment, useState } from "react";
import { Stack } from "expo-router";
import { TemplateBoardHeaderLeft } from "../components/board-template/header/TemplateBoardHeaderLeft";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { DashBoard } from "../components/ui/DashBoard";
import { useSettingsStore } from "../stores/settings";
import { useWorkoutStore } from "../stores/workout";
import { TemplateExerciseList } from "../components/board-template/sheets/exercises/TemplateExerciseList";
import { CreateTemplateBoard } from "../components/board-template/CreateTemplateBoard";

export type TemplateSheetType = "exercises" | "template";

export default function TemplateBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<TemplateSheetType>("template");
  const { theme } = useSettingsStore();
  const { activeTemplate } = useWorkoutStore();

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{ headerLeft: () => <TemplateBoardHeaderLeft /> }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <DashBoard
          listOpen={listOpen}
          togglePanel={togglePanel}
          colors={[
            theme.secondaryText,
            theme.secondaryText,
            theme.secondaryText,
            theme.secondaryText,
          ]}
          disabled={!activeTemplate?.layout}
          upperSection={<CreateTemplateBoard />}
          lowerSection={
            listType === "exercises" ? (
              <TemplateExerciseList togglePanel={togglePanel} />
            ) : listType === "template" ? (
              <></>
            ) : null
          }
        />
      </ScreenContent>
    </Fragment>
  );
}