import { Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { CopyWorkoutButton } from "../../components/recap/workout/CopyWorkoutButton";
import { SessionRecapHeader } from "../../components/recap/SessionRecapHeader";
import { ModalExitButton } from "../_layout";
import { WorkoutRecap } from "../../components/recap/workout/WorkoutRecap";

export default function SessionRecapScreen() {
  const { completedSessions } = useWorkoutStore();
  const { sessionId } = useLocalSearchParams();

  const session = completedSessions.find((s) => s.id === sessionId);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <CopyWorkoutButton session={session} />,
          headerTitle: () => <SessionRecapHeader session={session} />,
          headerRight: () => <ModalExitButton />,
        }}
      />
      <ScreenContent edges={["top", "bottom"]} scroll={false}>
        <WorkoutRecap session={session} />
      </ScreenContent>
    </Fragment>
  );
}
