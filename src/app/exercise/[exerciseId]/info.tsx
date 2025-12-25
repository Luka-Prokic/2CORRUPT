import { Fragment, useState } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { ModalView } from "../../../components/ui/containers/ModalView";
import { ExerciseInfoHeaderRight } from "../../../components/exercises/header/ExerciseInfoHeaderRight";
import { ExerciseStatsView } from "../../../components/exercises/exercise-stats/ExerciseStatsView";
import { ExerciseInfoView } from "../../../components/exercises/exercise-info/ExerciseInfoView";

export default function ExerciseListScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { getExerciseById } = useWorkoutStore();
  const exercise = getExerciseById(exerciseId as string);
  const { t } = useTranslation();
  const locale = t("locale");
  const [isStats, setIsStats] = useState(true);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: exercise?.defaultName?.[locale],
          headerRight: () => (
            <ExerciseInfoHeaderRight
              isStats={!isStats}
              handlePress={() => setIsStats(!isStats)}
            />
          ),
        }}
      />

      <ScreenContent>
        <ModalView>
          {isStats ? (
            <ExerciseStatsView exercise={exercise} />
          ) : (
            <ExerciseInfoView exercise={exercise} />
          )}
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
