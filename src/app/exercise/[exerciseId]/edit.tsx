import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../../stores/workout";
import { useMemo } from "react";
import { ExerciseInfoName } from "../../../components/exercises/ExerciseInfoName";
import { IText } from "../../../components/ui/text/IText";
import { ExerciseEditHeaderLeft } from "../../../components/exercises/header/ExerciseEditHeaderLeft";
import { ExerciseEditHeaderRight } from "../../../components/exercises/header/ExerciseEditHeaderRight";

export default function ExerciseListScreen() {
  const { getExerciseById, draftExercise, placeholderExercise } =
    useWorkoutStore();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const exercise = useMemo(() => getExerciseById(exerciseId), [exerciseId]);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ExerciseEditHeaderLeft />,
          headerTitle: () => <IText text={"edit"} />,
          headerRight: () => <ExerciseEditHeaderRight />,
        }}
      />

      <ScreenContent>
        <ScreenView>
          <ExerciseInfoName exercise={exercise} />
          <IText text={draftExercise?.defaultName || "Exercise"} />
          <IText text={placeholderExercise?.defaultName || "Exercise"} />
          <IText text={draftExercise?.userId || "Exercise"} />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
