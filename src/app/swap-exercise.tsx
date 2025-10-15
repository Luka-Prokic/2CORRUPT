import { Fragment, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ExerciseInfo } from "../stores/workout/types";
import { ExerciseFilter } from "../components/exercise-add/ExerciseFilter";
import { SwapExerciseCard } from "../components/exercise-swap/SwapExerciseCard";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../stores/settings";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function SwapExerciseScreen() {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo>();
  const [filteredExercises, setFilteredExercises] = useState<ExerciseInfo[]>(
    []
  );

  function handleSelectExercise(exercise: ExerciseInfo) {
    setSelectedExercise(exercise);
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
          title: t("navigation.swapExercise"),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ padding: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color={theme.text} />
            </TouchableOpacity>
          ),
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
            return (
              <SwapExerciseCard
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
          removeClippedSubviews={true}
        />
      </ScreenContent>
    </Fragment>
  );
}
