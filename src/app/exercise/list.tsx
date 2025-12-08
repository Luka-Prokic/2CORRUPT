import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { router, Stack } from "expo-router";
import { FlatList } from "react-native";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { IText } from "../../components/ui/text/IText";
import { StrobeOptionButton } from "../../components/ui/buttons/StrobeOptionButton";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../stores/workout";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUserStore } from "../../stores/user/useUserStore";

export default function ExerciseListScreen() {
  const { theme } = useSettingsStore();
  const { user } = useUserStore();

  const { exercises, startDraftExercise, draftExercise, removeExercise } =
    useWorkoutStore();

  function handlePress(exerciseId: string) {
    startDraftExercise(exercises.find((e) => e.id === exerciseId));
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise.userId === user?.id)
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

  function handleLongPress(exerciseId: string) {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise.userId !== user?.id)
      router.push({
        pathname: "/exercise/[exerciseId]/info",
        params: { exerciseId },
      });

    removeExercise(exerciseId);
  }

  const reversedExercises = [...exercises].reverse();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <Fragment />,
          headerTitle: () => <IText text="Exercises" />,
        }}
      />
      <ScreenContent>
        <ScreenView>
          <IText text={draftExercise?.defaultName?.en || "no"} />
          <StrobeOptionButton
            title={"+ New Exercise"}
            height={64}
            onPress={() => handlePress("new")}
          />
          <FlatList
            data={reversedExercises}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <StrobeOptionButton
                title={item.defaultName.en}
                height={64}
                strobeDisabled
                onPress={() => handlePress(item.id)}
                onLongPress={() => handleLongPress(item.id)}
                color={item.userId === user?.id ? theme.accent : theme.info}
              />
            )}
            ListFooterComponent={() => <EmptyFooter />}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
