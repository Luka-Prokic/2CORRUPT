import { useState } from "react";
import { FlatList, View } from "react-native";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { ExerciseInfo } from "../stores/workout/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settingsStore";
import { BottomAddExerciseSection } from "../components/add-exercise/BottomAddExerciseSection";
import { AddExerciseCard } from "../components/add-exercise/exercise/AddExerciseCard";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterFlatList } from "../components/ui/FilterFlatList";
import { WIDTH } from "../features/Dimensions";

export const BODY_PARTS = [
  "All",
  "Triceps",
  "Biceps",
  "Forearms",
  "Chest",
  "Lats",
  "Glutes",
  "Hamstrings",
  "Calves",
  "Abs",
  "Delts",
  "Traps",
];

export const EQUIPMENT = ["All", "Barbell", "Dumbbell", "Machine", "Cable"];

export function AddExerciseScreen() {
  const { exercises } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercises([...selectedExercises, exercise]);
  }

  function handleSelectBodyPart(bodyPart: string) {
    setSelectedBodyPart(bodyPart.toLowerCase());
  }

  function handleSelectEquipment(equipment: string) {
    setSelectedEquipment(equipment.toLowerCase());
  }

  function handleUnselectExercise(exercise: ExerciseInfo) {
    setSelectedExercises(
      selectedExercises.filter((ex: ExerciseInfo) => ex.id !== exercise.id)
    );
  }

  const exercisesFiltered = exercises
    .filter((ex: ExerciseInfo) => {
      const primaryAndSecondary = [
        ...(ex.primaryMuscles?.map((m) => m.toLowerCase()) || []),
        ...(ex.secondaryMuscles?.map((m) => m.toLowerCase()) || []),
      ];

      const matchesBodyPart =
        selectedBodyPart === "all" ||
        primaryAndSecondary.includes(selectedBodyPart);

      const matchesEquipment =
        selectedEquipment === "all" ||
        (ex.equipment?.map((eq) => eq.toLowerCase()) || []).includes(
          selectedEquipment
        );

      const matchesSearch = ex.defaultName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesSearch && matchesBodyPart && matchesEquipment;
    })
    .sort((a, b) => {
      const aPrimaryIndex = BODY_PARTS.indexOf(
        (a.primaryMuscles?.[0] || "").toLowerCase()
      );
      const bPrimaryIndex = BODY_PARTS.indexOf(
        (b.primaryMuscles?.[0] || "").toLowerCase()
      );

      if (aPrimaryIndex !== bPrimaryIndex) return aPrimaryIndex - bPrimaryIndex;

      const aSecondaryIndex = a.secondaryMuscles?.[0]
        ? BODY_PARTS.indexOf(a.secondaryMuscles[0].toLowerCase())
        : Infinity;
      const bSecondaryIndex = b.secondaryMuscles?.[0]
        ? BODY_PARTS.indexOf(b.secondaryMuscles[0].toLowerCase())
        : Infinity;

      return aSecondaryIndex - bSecondaryIndex;
    });

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search exercises"
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
          title="Body Part"
          data={BODY_PARTS}
          onSelect={handleSelectBodyPart}
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
        title="Equipment"
          data={EQUIPMENT}
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

      <FlatList
        data={exercisesFiltered}
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
      />
      <BottomAddExerciseSection selectedExercises={selectedExercises} />
    </SafeAreaView>
  );
}
