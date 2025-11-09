import { Fragment, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenContent } from "../../../../components/ui/utils/ScreenContent";
import { AddSplitWorkoutList } from "../../../../components/splits/add-workout/AddWorkoutList";
import { WorkoutTemplate } from "../../../../stores/workout/types";
import { WorkoutFilter } from "../../../../components/splits/add-workout/WorkoutFilter";
import { BottomAddWorkoutSection } from "../../../../components/splits/add-workout/BottomAddWorkoutSection";
import { EmptyFooter } from "../../../../components/ui/containers/EmptyFooter";

export default function AddPlannedWorkoutScreen() {
  const { t } = useTranslation();
  const { workoutId, mode } = useLocalSearchParams<{
    workoutId?: string;
    mode?: string;
  }>();
  const isSwapMode = mode === "swap" && workoutId;
  const [selected, setSelected] = useState<WorkoutTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(
    []
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("splits.add-workout"),
          headerBlurEffect: "none",
        }}
      />
      <ScreenContent
        edges={["top"]}
        scroll={false}
        FooterComponent={
          <BottomAddWorkoutSection selectedTemplates={selected} />
        }
      >
        <WorkoutFilter setFilteredTemplates={setFilteredTemplates} />
        <AddSplitWorkoutList
          filteredTemplates={filteredTemplates}
          selectedTemplates={selected}
          setSelectedTemplates={setSelected}
          maxSelection={isSwapMode ? 1 : undefined}
        />
        <EmptyFooter />
      </ScreenContent>
    </Fragment>
  );
}
