import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../../stores/workout";
import { useMemo } from "react";
import { ExerciseInfoName } from "../../../components/exercises/ExerciseInfoName";
import { ExerciseDraftHeaderLeft } from "../../../components/exercises/header/ExerciseDraftHeaderLeft";
import { ExerciseCreateHeaderRight } from "../../../components/exercises/header/ExerciseCreateHeaderRight";

export default function ExerciseCreateScreen() {
  const { getExerciseById, draftExercise, placeholderExercise } =
    useWorkoutStore();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const exercise = useMemo(() => getExerciseById(exerciseId), [exerciseId]);

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
          <ExerciseInfoName exercise={exercise} />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
