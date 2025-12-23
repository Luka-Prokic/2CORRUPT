import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout";
import { ExerciseDraftHeaderLeft } from "../../../components/exercises/header/ExerciseDraftHeaderLeft";
import { ExerciseCreateHeaderRight } from "../../../components/exercises/header/ExerciseCreateHeaderRight";
import { EditExerciseName } from "../../../components/exercises/edit-create/EditExerciseName";
import { MuscleCategorySelect } from "../../../components/exercises/edit-create/MuscleCategorySelect";
import { ExerciseEquipmentSelect } from "../../../components/exercises/edit-create/ExerciseEquipmentSelect";
import { ExerciseMuscleSelect } from "../../../components/exercises/edit-create/ExerciseMuscleSelect";
import { ModalView } from "../../../components/ui/containers/ModalView";

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
        <ModalView style={{ gap: 16 }}>
          <EditExerciseName exercise={draftExercise} />
          <MuscleCategorySelect />
          <ExerciseMuscleSelect />
          <ExerciseEquipmentSelect />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
