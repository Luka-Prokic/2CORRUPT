import { useMemo, useState } from "react";
import { ExerciseInfo } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { useCategory, useEquipment } from "../../utils/Labels";

export function useFilterAddExercise() {
  const { exercises } = useWorkoutStore();
  const { t } = useTranslation();
  const categories = useCategory();
  const equipmentList = useEquipment();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    t("categories.full-body")
  );
  const [selectedEquipment, setSelectedEquipment] = useState(
    t("equipment.all")
  );

  // Category checkers
  const isAllCategory = (cat: string) =>
    cat.toLowerCase() === t("categories.full-body").toLowerCase();

  // Equipment checkers
  const isAllEquipment = (eq: string) =>
    eq.toLowerCase() === t("equipment.all").toLowerCase();

  const exercisesFiltered = useMemo(() => {
    return exercises
      .filter((ex: ExerciseInfo) => {
        const translatedCategory = t(
          `categories.${ex.category?.toLowerCase()}`
        );
        const translatedEquipment = ex.equipment?.map((eq) =>
          t(`equipment.${eq.toLowerCase()}`).toLowerCase()
        );

        // Then use your comparators
        const matchesCategory =
          isAllCategory(selectedCategory) ||
          (translatedCategory?.toLowerCase() || "").includes(
            selectedCategory.toLowerCase()
          );

        const matchesEquipment =
          isAllEquipment(selectedEquipment) ||
          translatedEquipment?.includes(selectedEquipment.toLowerCase());

        const translatedName = t(`exercises.${ex.slug}`);
        const nameToSearch = [ex.defaultName, translatedName];

        const matchesSearch = nameToSearch.some((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return matchesSearch && matchesCategory && matchesEquipment;
      })
      .sort((a, b) => {
        const aIndex = categories.indexOf(a.category?.toLowerCase() || "");
        const bIndex = categories.indexOf(b.category?.toLowerCase() || "");
        return aIndex - bIndex;
      });
  }, [
    exercises,
    searchQuery,
    selectedCategory,
    selectedEquipment,
    categories,
    t,
  ]);

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
