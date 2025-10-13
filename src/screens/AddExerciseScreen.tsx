import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ExerciseInfo } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { BottomAddExerciseSection } from "../components/exercise-add/BottomAddExerciseSection";
import { AddExerciseCard } from "../components/exercise-add/AddExerciseCard";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { EmptyFooter } from "../components/ui/containers/EmptyFooter";

export function AddExerciseScreen() {
  const { theme } = useSettingsStore();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
  );
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
        ListFooterComponent={() => {
          return <EmptyFooter />;
        }}
      />

      <BottomAddExerciseSection selectedExercises={selectedExercises} />
    </SafeAreaView>
  );
}
