import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workoutStore";

//parts##
import { WorkoutBoardHeader } from "../components/board-workout/WorkoutBoardHeader";
import {
  SessionDashboard,
  SessionListType,
} from "../components/board-workout/SessionDashboard";

export function WorkoutBoard() {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState<SessionListType>("session");

  if (!activeSession || !activeSession.layout)
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>No active session</Text>
      </View>
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
