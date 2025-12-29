import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { ExerciseInfoHeaderRight } from "../../../components/exercise-list/header/ExerciseInfoHeaderRight";
import { ExerciseBasicInfo } from "../../../components/exercise-info/ExerciseBasicInfo";
import { AddToActiveSessionOrTemplate } from "../../../components/exercise-info/AddToActiveSessionOrTemplate";

export default function ExerciseInfoScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { getExerciseById } = useWorkoutStore();
  const { activeSession, activeTemplate } = useWorkoutStore();
  const showAddToActiveSessionOrTemplate = activeSession || activeTemplate;
  const exercise = getExerciseById(exerciseId as string);
  const { t } = useTranslation();
  const locale = t("locale");

  function handlePress() {
    router.replace({
      pathname: "/exercise/[exerciseId]/stats",
      params: { exerciseId: exerciseId as string },
    });
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: exercise?.defaultName?.[locale],
          headerRight: () => (
            <Fragment>
              <ExerciseInfoHeaderRight isStats handlePress={handlePress} />
            </Fragment>
          ),
        }}
      />

      <ScreenContent>
        <ModalView fadeIn>
          {showAddToActiveSessionOrTemplate && (
            <AddToActiveSessionOrTemplate exercise={exercise} />
          )}
          <ExerciseBasicInfo exercise={exercise} />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
