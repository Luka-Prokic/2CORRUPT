import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExerciseInfo,
  MuscleCategory,
  Equipment,
} from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

export function useFilterAddExercise() {
  const { exercises, muscleCategories, equipment } = useWorkoutStore();
  const { t } = useTranslation();

  const currentLocale = t("locale") as keyof ExerciseInfo["defaultName"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    MuscleCategory["id"] | "full-body"
  >("full-body");
  const [selectedEquipment, setSelectedEquipment] = useState<
    Equipment["id"] | "all"
  >("all");

  const exercisesFiltered = useMemo(() => {
    return (
      exercises
        ?.filter((ex) => {
          // Filter by category
          const matchesCategory =
            selectedCategory === "full-body" ||
            ex.category === selectedCategory;

          // Filter by equipment
          const matchesEquipment =
            selectedEquipment === "all" ||
            ex.equipment?.includes(selectedEquipment);

          // Filter by search
          const nameToSearch = ex.defaultName[currentLocale] ?? "";
          const matchesSearch = nameToSearch
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

          return matchesCategory && matchesEquipment && matchesSearch;
        })
        .sort((a, b) => {
          const aIndex = muscleCategories.findIndex((c) => c.id === a.category);
          const bIndex = muscleCategories.findIndex((c) => c.id === b.category);
          return aIndex - bIndex;
        }) ?? []
    );
  }, [
    exercises,
    searchQuery,
    selectedCategory,
    selectedEquipment,
    muscleCategories,
    currentLocale,
  ]);

  return {
    exercisesFiltered,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedEquipment,
    setSelectedEquipment,
    muscleCategories,
    equipment,
    currentLocale,
  };
}
