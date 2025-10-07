import { useState } from "react";
import { FlatList } from "react-native";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { ExerciseInfo } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { BottomAddExerciseSection } from "../components/add-exercise/BottomAddExerciseSection";
import { AddExerciseCard } from "../components/add-exercise/exercise/AddExerciseCard";

export function AddExerciseScreen() {
  const { exercises } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
  );

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercises([...selectedExercises, exercise]);
  }

  function handleUnselectExercise(exercise: ExerciseInfo) {
    setSelectedExercises(
      selectedExercises.filter((ex) => ex.id !== exercise.id)
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <FlatList
        data={exercises}
        renderItem={({ item }) => {
          const count = selectedExercises.filter(
            (ex) => ex.id === item.id
          ).length;

          return (
            <AddExerciseCard
              exercise={item}
              onSelect={handleSelectExercise}
              selectedTotal={count}
              unSelect={handleUnselectExercise}
            />
          );
        }}
      />
      <BottomAddExerciseSection
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
    </SafeAreaView>
  );
}
