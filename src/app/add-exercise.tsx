import { Fragment, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ExerciseInfo } from "../stores/workout/types";
import { BottomAddExerciseSection } from "../components/exercise-add/BottomAddExerciseSection";
import { AddExerciseCard } from "../components/exercise-add/AddExerciseCard";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { EmptyFooter } from "../components/ui/containers/EmptyFooter";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import { CreateNewExerciseButton } from "../components/exercise-add/CreateNewExerciseButton";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function AddExerciseScreen() {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>(
    []
  );
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercises([...selectedExercises, exercise]);
  }

  function handleUnselectExercise(exercise: ExerciseInfo) {
    setSelectedExercises(
      selectedExercises.filter((ex: ExerciseInfo) => ex.id !== exercise.id)
    );
  }

  const PAGE_SIZE = 20; // number of items per "page"
  const [page, setPage] = useState(1);

  const pagedExercises = filteredExercises.slice(0, page * PAGE_SIZE);

  const handleLoadMore = () => {
    if (page * PAGE_SIZE < filteredExercises.length) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filteredExercises.length]);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.addExercise"),
          headerLeft: () => <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>,
          headerRight: () => <CreateNewExerciseButton />,
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "none",
        }}
      />
      <ScreenContent
        scroll={false}
        edges={["top"]}
        style={{ backgroundColor: theme.background }}
      >
        <ExerciseFilter
          setFilteredExercises={setFilteredExercises}
          style={{ marginTop: insets.top }}
        />
        <FlatList
          data={pagedExercises}
          keyExtractor={(item) => item.id}
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
          removeClippedSubviews={true}
          ListFooterComponent={() => {
            return <EmptyFooter />;
          }}
        />

        <BottomAddExerciseSection selectedExercises={selectedExercises} />
      </ScreenContent>
    </Fragment>
  );
}
