import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workoutStore";

//parts##
import { WorkoutBoardHeader } from "../components/board-workout/WorkoutBoardHeader";
import { SessionDashboard } from "../components/board-workout/SessionDashboard";

export function WorkoutBoard() {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();
  const [listOpen, setListOpen] = useState(false);

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
      <SessionDashboard listOpen={listOpen} setListOpen={setListOpen} />
    </SafeAreaView>
  );
}
