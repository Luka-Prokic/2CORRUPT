import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workoutStore";

//parts##
import { WorkoutBoardHeader } from "../components/board-workout/WorkoutBoardHeader";
import {
  SessionDashboard,
  SessionSheetType,
} from "../components/board-workout/SessionDashboard";
import { TemplateBoardHeader } from "../components/board-workout/TemplateBoardHeader";

export function WorkoutBoard() {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<SessionSheetType>("session");

  if (!activeSession || !activeSession.layout)
    return (
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <TemplateBoardHeader listOpen={listOpen} />
        {/* Main Body */}
        <SessionDashboard
          listOpen={listOpen}
          listType={listType}
          setListOpen={setListOpen}
          setListType={setListType}
        />
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      {/* Top Header */}
      <WorkoutBoardHeader listOpen={listOpen} />

      {/* Main Body */}
      <SessionDashboard
        listOpen={listOpen}
        listType={listType}
        setListOpen={setListOpen}
        setListType={setListType}
      />
    </SafeAreaView>
  );
}
