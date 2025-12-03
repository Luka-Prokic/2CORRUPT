import { Fragment, useState } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { WorkoutBoardHeaderLeft } from "../components/board-workout/header/WorkoutBoardHeaderLeft";
import { WorkoutBoardHeaderTitle } from "../components/board-workout/header/WorkoutBoardHeaderTitle";
import { WorkoutBoardHeaderRight } from "../components/board-workout/header/WorkoutBoardHeaderRight";
import { DashBoard } from "../components/ui/DashBoard";
import { useWorkoutStore } from "../stores/workout";
import { NoExerciseBoard } from "../components/board-workout/NoExerciseBoard";
import { ExerciseProfile } from "../components/board-workout/profile/ExerciseProfile";
import { SessionExerciseList } from "../components/board-workout/sheets/exercises/SessionExerciseList";
import { RestTimerSheet } from "../components/board-workout/sheets/rest/RestTimerSheet";
import { ExerciseNameSheet } from "../components/board-workout/sheets/name/ExerciseNameSheet";
import { SessionSheet } from "../components/board-workout/sheets/session/SessionSheet";

export type SessionSheetType = "exercises" | "rest" | "name" | "session" | null;

export default function WorkoutBoard() {
  const [sheetType, setSheetType] = useState<SessionSheetType>(null);
  const { activeExercise } = useWorkoutStore();

  function togglePanel() {
    if (!!sheetType) setSheetType(null);
    else setSheetType("exercises");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerLeft: () => <WorkoutBoardHeaderLeft listOpen={!!sheetType} />,

          headerTitle: () => (
            <WorkoutBoardHeaderTitle
              listType={sheetType}
              setListType={setSheetType}
            />
          ),
          headerRight: () => <WorkoutBoardHeaderRight />,
        }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <DashBoard
          sheetOpen={!!sheetType}
          togglePanel={togglePanel}
          disabled={!activeExercise && !sheetType}
          upperSection={
            activeExercise ? (
              <ExerciseProfile setSheetType={setSheetType} />
            ) : (
              <NoExerciseBoard />
            )
          }
          lowerSection={
            sheetType === "exercises" ? (
              <SessionExerciseList togglePanel={togglePanel} />
            ) : sheetType === "rest" ? (
              <RestTimerSheet />
            ) : sheetType === "name" ? (
              <ExerciseNameSheet />
            ) : sheetType === "session" ? (
              <SessionSheet />
            ) : null
          }
        />
      </ScreenContent>
    </Fragment>
  );
}
