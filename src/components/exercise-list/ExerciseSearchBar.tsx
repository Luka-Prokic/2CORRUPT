import { useEffect } from "react";
import { ViewStyle } from "react-native";
import { SearchBar } from "../ui/input/SearchBar";
import { useTranslation } from "react-i18next";
import { useFilterAddExercise } from "../../features/workout/useFilterAddExercise";
import { ExerciseInfo } from "../../stores/workout/types";

interface ExerciseSearchBarProps {
  setFilteredExercises: (exercises: ExerciseInfo[]) => void;
  style?: ViewStyle | ViewStyle[];
}

export function ExerciseSearchBar({
  setFilteredExercises,
  style,
}: ExerciseSearchBarProps) {
  const { t } = useTranslation();

  const { exercisesFiltered, searchQuery, setSearchQuery } =
    useFilterAddExercise();

  useEffect(() => {
    setFilteredExercises(exercisesFiltered);
  }, [exercisesFiltered]);

  return (
    <SearchBar
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder={t("add-exercise.search")}
      style={{ marginHorizontal: 16, ...style }}
    />
  );
}
