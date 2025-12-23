import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { IText } from "../../../components/ui/text/IText";

export default function ExerciseListScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { getExerciseById } = useWorkoutStore();
  const exercise = getExerciseById(exerciseId as string);
  const { t } = useTranslation();
  const locale = t("locale");

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: exercise?.defaultName?.[locale],
        }}
      />

      <ScreenContent>
        <ModalView>
          <IText text={exercise?.defaultName?.[locale]} />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
