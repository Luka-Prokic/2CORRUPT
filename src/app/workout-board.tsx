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

export type SessionSheetType = "exercises" | "rest" | "name" | "session";

export default function WorkoutBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<SessionSheetType>("session");
  const { activeExercise } = useWorkoutStore();

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerLeft: () => <WorkoutBoardHeaderLeft listOpen={listOpen} />,

          headerTitle: () => (
            <WorkoutBoardHeaderTitle
              listOpen={listOpen}
              setListOpen={setListOpen}
              setListType={setListType}
            />
          ),
          headerRight: () => <WorkoutBoardHeaderRight />,
        }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <DashBoard
          listOpen={listOpen}
          togglePanel={togglePanel}
          disabled={!activeExercise && !listOpen}
          upperSection={
            activeExercise ? (
              <ExerciseProfile
                openPanel={() => setListOpen(true)}
                setListType={setListType}
              />
            ) : (
              <NoExerciseBoard />
            )
          }
          lowerSection={
            listType === "exercises" ? (
              <SessionExerciseList togglePanel={togglePanel} />
            ) : listType === "rest" ? (
              <RestTimerSheet />
            ) : listType === "name" ? (
              <ExerciseNameSheet />
            ) : listType === "session" ? (
              <SessionSheet />
            ) : null
          }
        />
      </ScreenContent>
    </Fragment>
  );
}
