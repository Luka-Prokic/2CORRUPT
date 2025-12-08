import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { router, Stack } from "expo-router";
import { FlatList } from "react-native";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { IText } from "../../components/ui/text/IText";
import { StrobeOptionButton } from "../../components/ui/buttons/StrobeOptionButton";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { useWorkoutStore } from "../../stores/workout";

export default function ExerciseListScreen() {
  const { exercises, startDraftExercise, draftExercise, removeExercise } =
    useWorkoutStore();

  function handlePress(exerciseId: string) {
    startDraftExercise(exercises.find((e) => e.id === exerciseId));
    router.push({
      pathname: "/exercise/[exerciseId]/edit",
      params: { exerciseId },
    });
  }

  function handleLongPress(exerciseId: string) {
    removeExercise(exerciseId);
  }
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
          <IText text={draftExercise?.defaultName || "no"} />
          <StrobeOptionButton
            title={"+ New Exercise"}
            height={64}
            onPress={() => handlePress("new")}
          />
          <FlatList
            data={exercises}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <StrobeOptionButton
                title={item.defaultName}
                height={64}
                strobeDisabled
                onPress={() => handlePress(item.id)}
                onLongPress={() => handleLongPress(item.id)}
              />
            )}
            ListFooterComponent={() => <EmptyFooter />}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
