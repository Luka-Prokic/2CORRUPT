import { WorkoutView } from "../components/view-workout/WorkoutView";
import { HomeView } from "../components/view-home/HomeView";
import { CorruptButton } from "../components/corrupt/CorruptButton";
import { TemplateView } from "../components/view-template/TemplateView";
import { StartView } from "../components/view-start/StartView";
import { Fragment, useMemo } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useUIStore } from "../stores/ui";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { BackHomeButton } from "../components/view-home/BackHomeButton";
import { useSettingsStore } from "../stores/settingsStore";
import {
  ExerciseFlow,
  LeftExerciseFlow,
  RightExerciseFlow,
} from "../components/view-workout/table/header/ExerciseFlow";

export default function HomeScreen() {
  const { typeOfView } = useUIStore();
  const { activeExercise } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const headerShown = useMemo(() => {
    if (typeOfView === "workout" || typeOfView === "start") return true;
    return false;
  }, [typeOfView, activeExercise]);

  function headerLeft() {
    if (typeOfView === "workout" && activeExercise) return <LeftExerciseFlow />;
    if ((!activeExercise && typeOfView === "workout") || typeOfView === "start")
      return <BackHomeButton />;

    return null;
  }

  function headerTitle() {
    if (typeOfView === "workout" && activeExercise) return <ExerciseFlow />;
    return <Fragment />;
  }

  function headerRight() {
    if (typeOfView === "workout" && activeExercise)
      return <RightExerciseFlow />;
    return <Fragment />;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: headerShown,
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerRight: headerRight,
          headerBlurEffect: "none",
        }}
      />

      <ScreenContent
        edges={["bottom", "top"]}
        style={{ backgroundColor: theme.background }}
        scroll={false}
      >
        <HomeView />
        <StartView />
        <WorkoutView />
        <TemplateView />
      </ScreenContent>
      <CorruptButton />
    </Fragment>
  );
}
