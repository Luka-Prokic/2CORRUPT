import { useState } from "react";
import { FlatList } from "react-native";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { ExerciseInfo } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { BottomAddExerciseSection } from "../components/add-exercise/BottomAddExerciseSection";
import { AddExerciseCard } from "../components/add-exercise/exercise/AddExerciseCard";
import { SearchBar } from "../components/ui/SearchBar";

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
      selectedExercises.filter((ex: ExerciseInfo) => ex.id !== exercise.id)
    );
  }
  const [query, setQuery] = useState("");
  const exercisesFiltered = exercises.filter((ex: ExerciseInfo) =>
    ex.defaultName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search exercises"
        style={{ marginHorizontal: 16 }}
      />

      <FlatList
        data={exercisesFiltered}
        renderItem={({ item }) => {
          const count = selectedExercises.filter(
            (ex: ExerciseInfo) => ex.id === item.id
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
      <BottomAddExerciseSection selectedExercises={selectedExercises} />
    </SafeAreaView>
  );
}
