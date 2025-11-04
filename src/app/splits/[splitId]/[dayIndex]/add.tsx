import { Fragment, useState } from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenContent } from "../../../../components/ui/utils/ScreenContent";
import { AddSplitWorkoutList } from "../../../../components/splits/add-workout/AddWorkoutList";
import { WorkoutTemplate } from "../../../../stores/workout/types";
import { WorkoutFilter } from "../../../../components/splits/add-workout/WorkoutFilter";
import { BottomAddWorkoutSection } from "../../../../components/splits/add-workout/BottomAddWorkoutSection";

export default function AddPlannedWorkoutScreen() {
  const { t } = useTranslation();
  const [selectedTemplates, setSelectedTemplates] = useState<WorkoutTemplate[]>(
    []
  );
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(
    []
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{ title: t("splits.add-workout"), headerBlurEffect: "none" }}
      />
      <ScreenContent
        edges={["top"]}
        scroll={false}
        HeaderComponent={
          <WorkoutFilter setFilteredTemplates={setFilteredTemplates} />
        }
        FooterComponent={
          <BottomAddWorkoutSection selectedTemplates={selectedTemplates} />
        }
      >
        <AddSplitWorkoutList
          filteredTemplates={filteredTemplates}
          selectedTemplates={selectedTemplates}
          setSelectedTemplates={setSelectedTemplates}
        />
      </ScreenContent>
    </Fragment>
  );
}
