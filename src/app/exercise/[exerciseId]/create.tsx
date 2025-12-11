import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../../stores/workout";
import { ExerciseDraftHeaderLeft } from "../../../components/exercises/header/ExerciseDraftHeaderLeft";
import { ExerciseCreateHeaderRight } from "../../../components/exercises/header/ExerciseCreateHeaderRight";
import { EditExerciseName } from "../../../components/exercises/edit-create/EditExerciseName";
import { MuscleCategorySelect } from "../../../components/exercises/edit-create/MuscleCategorySelect";
import { ExerciseEquipmentSelect } from "../../../components/exercises/edit-create/ExerciseEquipmentSelect";
import { ExerciseMuscleSelect } from "../../../components/exercises/edit-create/ExerciseMuscleSelect";

export default function ExerciseCreateScreen() {
  const { draftExercise } = useWorkoutStore();

  if (!draftExercise) return null;

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => <ExerciseDraftHeaderLeft />,
          headerTitle: "create",
          headerRight: () => <ExerciseCreateHeaderRight />,
        }}
      />

      <ScreenContent>
        <ScreenView style={{ gap: 16 }}>
          <EditExerciseName exercise={draftExercise} />
          <MuscleCategorySelect />
          <ExerciseMuscleSelect />
          <ExerciseEquipmentSelect />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
