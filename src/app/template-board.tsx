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

export type TemplateSheetType =
  | "exercises"
  | "rest"
  | "name"
  | "template"
  | null;

export default function TemplateBoard() {
  const [sheetType, setSheetType] = useState<TemplateSheetType>(null);
  const { theme } = useSettingsStore();
  const { activeTemplate, activeExercise } = useWorkoutStore();

  function togglePanel() {
    if (!!sheetType) setSheetType(null);
    else setSheetType("exercises");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerLeft: () => <TemplateBoardHeaderLeft sheetOpen={!!sheetType} />,
          headerTitle: () => (
            <TemplateBoardHeaderTitle
              sheetType={sheetType}
              setSheetType={setSheetType}
            />
          ),
          headerRight: () => <TemplateBoardHeaderRight />,
        }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <DashBoard
          sheetOpen={!!sheetType}
          togglePanel={togglePanel}
          tint={theme.tint}
          disabled={!activeTemplate?.layout.length && !!sheetType}
          upperSection={
            activeExercise ? (
              <TemplateExerciseProfile setSheetType={setSheetType} />
            ) : (
              <CreateTemplateBoard />
            )
          }
          lowerSection={
            sheetType === "exercises" ? (
              <TemplateExerciseList togglePanel={togglePanel} />
            ) : sheetType === "rest" ? (
              <RestTimerSheet />
            ) : sheetType === "name" ? (
              <ExerciseNameSheet />
            ) : sheetType === "template" ? (
              <TemplateSheet />
            ) : null
          }
        />
      </ScreenContent>
    </Fragment>
  );
}
