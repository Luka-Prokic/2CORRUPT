import { Fragment, useState } from "react";
import {
  SessionDashboard,
  SessionSheetType,
} from "../components/board-workout/SessionDashboard";
import { Stack } from "expo-router";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { WorkoutBoardHeaderLeft } from "../components/board-workout/header/WorkoutBoardHeaderLeft";
import { WorkoutBoardHeaderTitle } from "../components/board-workout/header/WorkoutBoardHeaderTitle";
import { WorkoutBoardHeaderRight } from "../components/board-workout/header/WorkoutBoardHeaderRight";

export default function WorkoutBoard() {
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<SessionSheetType>("session");

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerLeft: () => (
            <WorkoutBoardHeaderLeft
              listOpen={listOpen}
              setListOpen={setListOpen}
              setListType={setListType}
            />
          ),

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
        <SessionDashboard
          listOpen={listOpen}
          listType={listType}
          setListOpen={setListOpen}
          setListType={setListType}
        />
      </ScreenContent>
    </Fragment>
  );
}
