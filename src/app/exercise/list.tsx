import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { router, Stack } from "expo-router";
import { FlatList } from "react-native";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { IText } from "../../components/ui/text/IText";
import { StrobeOptionButton } from "../../components/ui/buttons/StrobeOptionButton";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../stores/workout";
import { useUserStore } from "../../stores/user/useUserStore";
import { InfoExerciseCard } from "../../components/exercises/InfoExerciseCard";

export default function ExerciseListScreen() {
  const { user } = useUserStore();

  const { exercises, startDraftExercise, draftExercise } = useWorkoutStore();

  function handlePress(exerciseId: string) {
    startDraftExercise(exercises.find((e) => e.id === exerciseId));
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise && exercise.userId === user?.id)
      router.push({
        pathname: "/exercise/[exerciseId]/edit",
        params: { exerciseId },
      });
    else {
      router.push({
        pathname: "/exercise/[exerciseId]/create",
        params: { exerciseId },
      });
    }
  }

  const reversedExercises = [...exercises].reverse();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <Fragment />,
          headerTitle: () => (
            <IText text={draftExercise?.defaultName?.en || "Exercises"} />
          ),
        }}
      />
      <ScreenContent>
        <ScreenView>
          <StrobeOptionButton
            title={"+ New Exercise"}
            height={64}
            onPress={() => handlePress("new")}
          />
          <FlatList
            data={reversedExercises}
            scrollEnabled={false}
            renderItem={({ item }) => <InfoExerciseCard exercise={item} />}
            ListFooterComponent={() => <EmptyFooter />}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
