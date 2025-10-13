import { Fragment, useEffect } from "react";
import { SearchBar } from "../ui/input/SearchBar";
import { FilterFlatList } from "../ui/FilterFlatList";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useFilterAddExercise } from "../../features/workout/useFilterAddExercise";
import * as Haptics from "expo-haptics";
import { ExerciseInfo } from "../../stores/workout/types";

interface ExerciseFilterProps {
  setFilteredExercises: (exercises: ExerciseInfo[]) => void;
}

export function ExerciseFilter({ setFilteredExercises }: ExerciseFilterProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const {
    categories,
    equipmentList,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectedEquipment,
    setSelectedCategory,
    setSelectedEquipment,
    exercisesFiltered,
  } = useFilterAddExercise();

  function handleSelectCategory(bodyPart: string) {
    setSelectedCategory(bodyPart.toLowerCase());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  function handleSelectEquipment(equipment: string) {
    setSelectedEquipment(equipment.toLowerCase());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  useEffect(() => {
    setFilteredExercises(exercisesFiltered);
  }, [searchQuery, selectedCategory, selectedEquipment]);

  return (
    <Fragment>
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
          data={categories}
          onSelect={handleSelectCategory}
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
          onSelect={handleSelectEquipment}
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
    </Fragment>
  );
}
