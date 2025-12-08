import { useMemo, useState } from "react";
import {
  ExerciseInfo,
  Muscle,
  MuscleCategory,
} from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useCategory, useEquipment } from "../../utils/Labels";

export function useFilterAddExercise() {
  const { exercises } = useWorkoutStore();
  const categories = useCategory();
  const equipmentList = useEquipment();
  console.log(exercises);
  console.log(111);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<MuscleCategory["id"]>("full-body");
  const [selectedEquipment, setSelectedEquipment] =
    useState<Muscle["id"]>("all");

  // Category checkers
  const isAllCategory = (cat: string) => cat === "full-body";

  // Equipment checkers
  const isAllEquipment = (eq: string) => eq === "all";

  const exercisesFiltered = useMemo(() => {
    return (
      exercises?.filter((ex: ExerciseInfo) => {
        const translatedCategory = ex.category;
        const translatedEquipment = ex.equipment;

        // Then use your comparators
        const matchesCategory =
          isAllCategory(selectedCategory) ||
          (translatedCategory || "").includes(selectedCategory);

        const matchesEquipment =
          isAllEquipment(selectedEquipment) ||
          translatedEquipment?.includes(selectedEquipment);

        const nameToSearch = [ex.defaultName.en, ex.defaultName.rs];

        const matchesSearch = nameToSearch.some((name) =>
          name?.includes(searchQuery)
        );

        return matchesSearch && matchesCategory && matchesEquipment;
      }) ??
      [].sort((a, b) => {
        const aIndex = categories.indexOf(a.category || "");
        const bIndex = categories.indexOf(b.category || "");
        return aIndex - bIndex;
      })
    );
  }, [exercises, searchQuery, selectedCategory, selectedEquipment, categories]);

  return {
    exercisesFiltered,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedEquipment,
    setSelectedEquipment,
    categories,
    equipmentList,
  };
}
