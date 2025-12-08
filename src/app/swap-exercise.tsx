import { Fragment, useState } from "react";
import { ExerciseInfo } from "../stores/workout/types";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settings";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { SwapExerciseList } from "../components/exercise-swap/SwapExerciseList";

export default function SwapExerciseScreen() {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo>();
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.swapExercise"),
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
        <SwapExerciseList
          filteredExercises={filteredExercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
      </ScreenContent>
    </Fragment>
  );
}
