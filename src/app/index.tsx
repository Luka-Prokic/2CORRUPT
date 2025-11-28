import { WorkoutView } from "../components/view-workout/WorkoutView";
import { HomeView } from "../components/view-home/HomeView";
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
import {
  LeftTemplateExerciseFlow,
  RightTemplateExerciseFlow,
  TemplateExerciseFlow,
} from "../components/view-template/header/TemplateExerciseFlow";
import { CorruptButton } from "../components/corrupt/CorruptButton";

export default function HomeScreen() {
  const { typeOfView } = useUIStore();
  const { activeExercise } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const headerShown = useMemo(() => {
    if (typeOfView === "home") return false;
    return true;
  }, [typeOfView]);

  function headerLeft() {
    if (typeOfView === "workout" && activeExercise) return <LeftExerciseFlow />;
    if (typeOfView === "template") return <LeftTemplateExerciseFlow />;
    if (typeOfView === "home") return null;

    return <BackHomeButton />;
  }

  function headerTitle() {
    if (typeOfView === "workout" && activeExercise) return <ExerciseFlow />;
    if (typeOfView === "template" && activeExercise)
      return <TemplateExerciseFlow />;
    return <Fragment />;
  }

  function headerRight() {
    if (typeOfView === "workout" && activeExercise)
      return <RightExerciseFlow />;
    if (typeOfView === "template" && activeExercise)
      return <RightTemplateExerciseFlow />;
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
