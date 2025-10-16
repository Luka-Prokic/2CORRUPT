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

  const pagedExercises = filteredExercises.slice(0, page * PAGE_SIZE);

  const handleLoadMore = () => {
    if (page * PAGE_SIZE < filteredExercises.length) {
      setPage((prev) => prev + 1);
    }
  };

  function handleSelectExercise(exercise: ExerciseInfo) {
    // prevent duplicates
    if (!selectedExercises.some((ex) => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  }

  function handleUnselectExercise(exercise: ExerciseInfo) {
    setSelectedExercises(
      selectedExercises.filter((ex) => ex.id !== exercise.id)
    );
  }

  useEffect(() => {
    // reset pagination when the filter changes
    setPage(1);
  }, [filteredExercises.length]);

  return (
    <FlatList
      data={pagedExercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const count = selectedExercises.filter(
          (ex) => ex.id === item.id
        ).length;

        return (
          <AddExerciseCard
            exercise={item}
            onSelect={handleSelectExercise}
            unSelect={handleUnselectExercise}
            selectedTotal={count}
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