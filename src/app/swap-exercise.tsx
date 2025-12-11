import { Fragment, useState } from "react";
import { ExerciseInfo } from "../stores/workout/types";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ExerciseSectionList } from "../components/exercises/ExerciseSectionList";
import { MemoizedSwapExerciseCard } from "../components/exercise-swap/SwapExerciseCard";
import { IText } from "../components/ui/text/IText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SwapExerciseScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo | null>(
    null
  );
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "none",
          headerTitle: () => <IText text={t("navigation.swapExercise")} />,
        }}
      />
      <ScreenContent scroll={false} edges={["top"]}>
        <ExerciseFilter
          setFilteredExercises={setFilteredExercises}
          style={{ paddingTop: insets.top }}
        />

        <ExerciseSectionList
          exercises={filteredExercises}
          renderCard={(exercise) => (
            <MemoizedSwapExerciseCard
              exercise={exercise}
              onSelect={() => setSelectedExercise(exercise)}
              isSelected={selectedExercise?.id === exercise.id}
            />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
