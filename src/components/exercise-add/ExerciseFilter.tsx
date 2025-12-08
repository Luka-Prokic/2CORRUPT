import { useEffect, useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { SearchBar } from "../ui/input/SearchBar";
import { FilterFlatList } from "../ui/sliders/FilterFlatList";
import { WIDTH } from "../../utils/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useHaptics } from "../../features/ui/useHaptics";
import { useFilterAddExercise } from "../../features/workout/useFilterAddExercise";
import { ExerciseInfo } from "../../stores/workout/types";

interface ExerciseFilterProps {
  setFilteredExercises: (exercises: ExerciseInfo[]) => void;
  style?: ViewStyle | ViewStyle[];
}

export function ExerciseFilter({
  setFilteredExercises,
  style,
}: ExerciseFilterProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const {
    exercisesFiltered,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedEquipment,
    muscleCategories,
    equipment,
  } = useFilterAddExercise();

  const triggerHapticsRigid = useHaptics({
    modeType: "gentle",
    hapticType: "rigid",
  });

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    triggerHapticsRigid();
  };

  const handleSelectEquipment = (id: string) => {
    setSelectedEquipment(id);
    triggerHapticsRigid();
  };

  useEffect(() => {
    setFilteredExercises(exercisesFiltered);
  }, [exercisesFiltered]);

  // Prepare display lists (id + label)
  const muscleCategoriesList = useMemo(() => {
    return [
      { id: "fullBody", label: t("categories.full-body") },
      ...muscleCategories.map((item) => ({
        id: item.id,
        label: t(`categories.${item.id}`),
      })),
    ];
  }, [muscleCategories, t]);

  const equipmentList = useMemo(() => {
    return [
      { id: "all", label: t("equipment.all") },
      ...equipment.map((item) => ({
        id: item.id,
        label: t(`equipment.${item.id}`),
      })),
    ];
  }, [equipment, t]);

  return (
    <View style={style}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("add-exercise.search")}
        style={{ marginHorizontal: 16 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <FilterFlatList
          title={t("add-exercise.body-part")}
          data={muscleCategoriesList}
          onSelect={(item) => handleSelectCategory(item.id)}
          itemHeight={50}
          contentContainerStyle={{
            height: 54,
            width: WIDTH * 0.5 - 20,
            paddingVertical: 2,
            backgroundColor: theme.primaryBackground,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            borderRadius: 12,
          }}
        />
        <FilterFlatList
          title={t("add-exercise.equipment")}
          data={equipmentList}
          onSelect={(item) => handleSelectEquipment(item.id)}
          itemHeight={50}
          contentContainerStyle={{
            height: 54,
            width: WIDTH * 0.5 - 20,
            paddingVertical: 2,
            backgroundColor: theme.primaryBackground,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
}
