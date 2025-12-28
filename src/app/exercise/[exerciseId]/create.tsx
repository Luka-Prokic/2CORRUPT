import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout";
import { ExerciseDraftHeaderLeft } from "../../../components/exercise-list/header/ExerciseDraftHeaderLeft";
import { ExerciseCreateHeaderRight } from "../../../components/exercise-list/header/ExerciseCreateHeaderRight";
import { EditExerciseName } from "../../../components/exercise-edit/EditExerciseName";
import { MuscleCategorySelect } from "../../../components/exercise-edit/MuscleCategorySelect";
import { ExerciseEquipmentSelect } from "../../../components/exercise-edit/ExerciseEquipmentSelect";
import { ExerciseMuscleSelect } from "../../../components/exercise-edit/ExerciseMuscleSelect";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { EmptyFooter } from "../../../components/ui/containers/EmptyFooter";
import { IText } from "../../../components/ui/text/IText";
import { useTranslation } from "react-i18next";

export default function ExerciseCreateScreen() {
  const { draftExercise } = useWorkoutStore();
  const { t } = useTranslation();

  if (!draftExercise) return null;
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ExerciseDraftHeaderLeft />,
          headerTitle: () => <IText text={t("exercise.new")} />,
          headerRight: () => <ExerciseCreateHeaderRight />,
        }}
      />

      <ScreenContent>
        <ModalView style={{ gap: 16 }}>
          <EditExerciseName exercise={draftExercise} />
          <ExerciseEquipmentSelect />
          <MuscleCategorySelect />
          <ExerciseMuscleSelect />
          <EmptyFooter />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
