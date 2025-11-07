import { Fragment, useState } from "react";
import { ExerciseInfo } from "../stores/workout/types";
import { BottomAddExerciseSection } from "../components/exercise-add/BottomAddExerciseSection";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {  Stack } from "expo-router";
import { CreateNewExerciseButton } from "../components/exercise-add/CreateNewExerciseButton";
import { useTranslation } from "react-i18next";
import { AddExerciseList } from "../components/exercise-add/AddExerciseList";
import { ModalBackButton } from "./_layout";

export default function AddExerciseScreen() {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

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
          title: t("navigation.addExercise"),
          headerLeft: () => <ModalBackButton />,
          headerRight: () => <CreateNewExerciseButton />,
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "none",
        }}
      />
      <ScreenContent
        scroll={false}
        edges={["top"]}
        style={{ backgroundColor: theme.background }}
      >
        <ExerciseFilter
          setFilteredExercises={setFilteredExercises}
          style={{ marginTop: insets.top }}
        />

        <AddExerciseList
          filteredExercises={filteredExercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />

        <BottomAddExerciseSection selectedExercises={selectedExercises} />
      </ScreenContent>
    </Fragment>
  );
}
