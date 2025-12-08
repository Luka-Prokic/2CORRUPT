import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../../stores/workout";
import { ExerciseDraftHeaderLeft } from "../../../components/exercises/header/ExerciseDraftHeaderLeft";
import { ExerciseEditHeaderRight } from "../../../components/exercises/header/ExerciseEditHeaderRight";
import { EditExerciseName } from "../../../components/exercises/edit/EditExerciseName";

export default function ExerciseEditScreen() {
  const { draftExercise } = useWorkoutStore();

  if (!draftExercise) return null;

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ExerciseDraftHeaderLeft />,
          headerTitle: "edit",
          headerRight: () => <ExerciseEditHeaderRight />,
        }}
      />

      <ScreenContent>
        <ScreenView>
          {/* Exercise name inputs */}
          <EditExerciseName exercise={draftExercise} />

          {/* Exercise muscle categorie */}

          {/* Exercise primary/secondary muscles */}

          {/* Exercise equipment */}

          {/* Exercise "media" */}

          {/* Exercise description */}
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
