import { Fragment, useState } from "react";
import { Stack } from "expo-router";
import { TemplateBoardHeaderLeft } from "../components/board-template/header/TemplateBoardHeaderLeft";
import { TemplateBoardHeaderTitle } from "../components/board-template/header/TemplateBoardHeaderTitle";
import { TemplateBoardHeaderRight } from "../components/board-template/header/TemplateBoardHeaderRight";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { DashBoard } from "../components/ui/DashBoard";
import { useSettingsStore } from "../stores/settings";
import { useWorkoutStore } from "../stores/workout";
import { TemplateExerciseList } from "../components/board-template/sheets/exercises/TemplateExerciseList";
import { CreateTemplateBoard } from "../components/board-template/CreateTemplateBoard";
import { TemplateSheet } from "../components/board-template/sheets/template/TemplateSheet";
import { RestTimerSheet } from "../components/board-workout/sheets/rest/RestTimerSheet";
import { ExerciseNameSheet } from "../components/board-workout/sheets/name/ExerciseNameSheet";
import { TemplateExerciseProfile } from "../components/board-template/TemplateExerciseProfile";

export type TemplateSheetType = "exercises" | "rest" | "name" | "template";

export default function TemplateBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<TemplateSheetType>("template");
  const { theme } = useSettingsStore();
  const { activeTemplate, activeExercise } = useWorkoutStore();

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerLeft: () => (
            <TemplateBoardHeaderLeft
              listOpen={listOpen}
              setListOpen={setListOpen}
              setListType={setListType}
            />
          ),
          headerTitle: () => (
            <TemplateBoardHeaderTitle
              listOpen={listOpen}
              setListOpen={setListOpen}
              setListType={setListType}
            />
          ),
          headerRight: () => <TemplateBoardHeaderRight />,
        }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <DashBoard
          listOpen={listOpen}
          togglePanel={togglePanel}
          tint={theme.tint}
          disabled={!activeTemplate?.layout.length && !listOpen}
          upperSection={
            activeExercise ? (
              <TemplateExerciseProfile
                openPanel={() => setListOpen(true)}
                setListType={setListType}
              />
            ) : (
              <CreateTemplateBoard />
            )
          }
          lowerSection={
            listType === "exercises" ? (
              <TemplateExerciseList togglePanel={togglePanel} />
            ) : listType === "rest" ? (
              <RestTimerSheet />
            ) : listType === "name" ? (
              <ExerciseNameSheet />
            ) : listType === "template" ? (
              <TemplateSheet />
            ) : null
          }
        />
      </ScreenContent>
    </Fragment>
  );
}
