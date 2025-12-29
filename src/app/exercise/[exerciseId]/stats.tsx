import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { ExerciseInfoHeaderRight } from "../../../components/exercise-list/header/ExerciseInfoHeaderRight";
import { ExerciseStatsBadge } from "../../../components/exercise-stats/ExerciseStatsBadge";
import { ExerciseStatsSlider } from "../../../components/exercise-stats/ExerciseStatsSlider";

export default function ExerciseStatsScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { getExerciseById } = useWorkoutStore();
  const exercise = getExerciseById(exerciseId as string);
  const { t } = useTranslation();
  const locale = t("locale");

  function handlePress() {
    router.replace({
      pathname: "/exercise/[exerciseId]/info",
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
              <ExerciseInfoHeaderRight
                isStats={false}
                handlePress={handlePress}
              />
            </Fragment>
          ),
        }}
      />

      <ScreenContent>
        <ModalView fadeIn>
          <ExerciseStatsBadge />
          <ExerciseStatsSlider exercise={exercise} />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
