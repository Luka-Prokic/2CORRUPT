import { Fragment, useState } from "react";
import { ExerciseInfo } from "../../stores/workout/types";
import { BottomAddExerciseSection } from "../../components/exercise-add/BottomAddExerciseSection";
import { ExerciseFilter } from "../../components/exercise-add/ExerciseFilter";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { CreateNewExerciseButton } from "../../components/exercise-add/CreateNewExerciseButton";
import { useTranslation } from "react-i18next";
import { MemoizedAddExerciseCard } from "../../components/exercise-add/AddExerciseCard";
import { ExerciseSectionList } from "../../components/exercises/ExerciseSectionList";
import { IText } from "../../components/ui/text/IText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddExerciseScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
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
          headerTitle: () => <IText text={t("navigation.addExercise")} />,
          headerRight: () => <CreateNewExerciseButton />,
        }}
      />
      <ScreenContent
        scroll={false}
        edges={["top"]}
        FooterComponent={
          <BottomAddExerciseSection selectedExercises={selectedExercises} />
        }
      >
        <ExerciseFilter
          setFilteredExercises={setFilteredExercises}
          style={{ paddingTop: insets.top }}
        />
        <ExerciseSectionList
          exercises={filteredExercises}
          renderCard={(exercise) => (
            <MemoizedAddExerciseCard
              exercise={exercise}
              onSelect={() =>
                setSelectedExercises([...selectedExercises, exercise])
              }
              unSelect={() =>
                setSelectedExercises(
                  selectedExercises.filter((ex) => ex.id !== exercise.id)
                )
              }
              selectedExercises={selectedExercises}
            />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
