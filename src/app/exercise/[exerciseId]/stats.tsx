import { Fragment } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { ExerciseInfoHeaderRight } from "../../../components/exercise-list/header/ExerciseInfoHeaderRight";
import { ExerciseStatsView } from "../../../components/exercise-stats/ExerciseStatsView";

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
            <ExerciseInfoHeaderRight
              isStats={false}
              handlePress={handlePress}
            />
          ),
        }}
      />

      <ScreenContent>
        <ModalView fadeIn>
          <ExerciseStatsView exercise={exercise} />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
