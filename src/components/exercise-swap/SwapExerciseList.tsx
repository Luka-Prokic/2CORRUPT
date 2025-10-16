import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ExerciseInfo } from "../../stores/workout";
import { EmptyFooter } from "../ui/containers/EmptyFooter";
import { MemoizedSwapExerciseCard } from "./SwapExerciseCard";

const PAGE_SIZE = 20;

interface SwapExerciseListProps {
  filteredExercises: ExerciseInfo[];
  selectedExercise: ExerciseInfo;
  setSelectedExercise: (exercise: ExerciseInfo) => void;
}

export function SwapExerciseList({
  filteredExercises,
  selectedExercise,
  setSelectedExercise,
}: SwapExerciseListProps) {
  const [page, setPage] = useState(1);

  const pagedExercises = filteredExercises.slice(0, page * PAGE_SIZE);

  function handleLoadMore() {
    if (page * PAGE_SIZE < filteredExercises.length) {
      setPage((prev) => prev + 1);
    }
  }

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercise(exercise);
  }

  useEffect(() => {
    setPage(1);
  }, [filteredExercises.length]);

  return (
    <FlatList
      data={pagedExercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <MemoizedSwapExerciseCard
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
      removeClippedSubviews
      ListFooterComponent={<EmptyFooter />}
    />
  );
}
