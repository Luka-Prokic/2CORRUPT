import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ExerciseInfo } from "../../stores/workout";
import { AddExerciseCard } from "./AddExerciseCard";
import { EmptyFooter } from "../ui/containers/EmptyFooter";

const PAGE_SIZE = 20;

interface AddExerciseListProps {
  filteredExercises: ExerciseInfo[];
  selectedExercises: ExerciseInfo[];
  setSelectedExercises: (exercises: ExerciseInfo[]) => void;
}

export function AddExerciseList({
  filteredExercises,
  selectedExercises,
  setSelectedExercises,
}: AddExerciseListProps) {
  const [page, setPage] = useState(1);

  const pagedExercises = React.useMemo(
    () => filteredExercises.slice(0, page * PAGE_SIZE),
    [filteredExercises, page]
  );

  function handleLoadMore() {
    if (page * PAGE_SIZE < filteredExercises.length) {
      setPage((prev) => prev + 1);
    }
  }

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercises([...selectedExercises, exercise]);
  }

  function handleUnselectExercise(exercise: ExerciseInfo) {
    setSelectedExercises(
      selectedExercises.filter((ex) => ex.id !== exercise.id)
    );
  }

  useEffect(() => {
    setPage(1);
  }, [filteredExercises.length]);

  return (
    <FlatList
      data={pagedExercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AddExerciseCard
          exercise={item}
          onSelect={handleSelectExercise}
          unSelect={handleUnselectExercise}
          selectedExercises={selectedExercises}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      removeClippedSubviews
      ListFooterComponent={<EmptyFooter />}
    />
  );
}
