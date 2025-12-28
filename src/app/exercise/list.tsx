import { Fragment, useState } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { IText } from "../../components/ui/text/IText";
import { ExerciseInfo } from "../../stores/workout";
import { ExerciseSectionList } from "../../components/exercise-list/ExerciseSectionList";
import { CreateNewExerciseButton } from "../../components/exercise-add/CreateNewExerciseButton";
import { MemoizedInfoExerciseCard } from "../../components/exercise-list/InfoExerciseCard";
import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseSearchBar } from "../../components/exercise-list/ExerciseSearchBar";
import { useTranslation } from "react-i18next";

export default function ExerciseListScreen() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBlurEffect: "none",
          headerShadowVisible: false,
          headerTransparent: false,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerLeft: () => <Fragment />,
          headerTitle: () => <IText text={t("exercise.exercises")} />,
          headerRight: () => <CreateNewExerciseButton />,
        }}
      />
      <ScreenContent
        scroll={false}
        HeaderComponent={
          <ExerciseSearchBar setFilteredExercises={setFilteredExercises} />
        }
      >
        <ExerciseSectionList
          exercises={filteredExercises}
          renderCard={(exercise) => (
            <MemoizedInfoExerciseCard exercise={exercise} key={exercise.id} />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
