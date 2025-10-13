import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ExerciseInfo } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { SwapExerciseCard } from "../components/exercise-swap/SwapExerciseCard";

export function SwapExerciseScreen() {
  const { theme } = useSettingsStore();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo>();
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercise(exercise);
  }

  const PAGE_SIZE = 20; // number of items per "page"
  const [page, setPage] = useState(1);

  const pagedExercises = filteredExercises.slice(0, page * PAGE_SIZE);

  const handleLoadMore = () => {
    if (page * PAGE_SIZE < filteredExercises.length) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filteredExercises.length]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ExerciseFilter setFilteredExercises={setFilteredExercises} />
      <FlatList
        data={pagedExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <SwapExerciseCard
              exercise={item}
              onSelect={handleSelectExercise}
              isSelected={selectedExercise?.id === item.id}
            />
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}
