import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../../stores/workout";
import { ExerciseDraftHeaderLeft } from "../../../components/exercises/header/ExerciseDraftHeaderLeft";
import { ExerciseCreateHeaderRight } from "../../../components/exercises/header/ExerciseCreateHeaderRight";
import { EditExerciseName } from "../../../components/exercises/edit/EditExerciseName";

export default function ExerciseCreateScreen() {
  const { draftExercise } = useWorkoutStore();

  if (!draftExercise) return null;

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ExerciseDraftHeaderLeft />,
          headerTitle: "create",
          headerRight: () => <ExerciseCreateHeaderRight />,
        }}
      />

      <ScreenContent>
        <ScreenView>
          <EditExerciseName exercise={draftExercise} />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
