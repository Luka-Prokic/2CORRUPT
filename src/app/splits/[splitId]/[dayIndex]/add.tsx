import { Fragment, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenContent } from "../../../../components/ui/utils/ScreenContent";
import { AddSplitWorkoutList } from "../../../../components/splits/add-workout/AddSplitWorkoutList";
import { WorkoutTemplate } from "../../../../stores/workout/types";
import { WorkoutFilter } from "../../../../components/splits/add-workout/WorkoutFilter";
import { BottomAddWorkoutSection } from "../../../../components/splits/add-workout/BottomAddWorkoutSection";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { findTemplteOutOfWorkoutId } from "../../../../features/workout/findTemplteOutOfWorkoutId";
import { IText } from "../../../../components/ui/text/IText";

export default function AddPlannedWorkoutScreen() {
  const { t } = useTranslation();
  const { workoutId, mode } = useLocalSearchParams<{
    workoutId?: string;
    mode?: string;
  }>();
  const { templates, splitPlans } = useWorkoutStore();
  const isSwapMode = mode === "swap" && workoutId ? true : false;
  const [selected, setSelected] = useState<WorkoutTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(
    []
  );

  const swapTemplate = findTemplteOutOfWorkoutId(
    workoutId,
    splitPlans,
    templates
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <IText
              text={
                isSwapMode ? t("splits.swap-workout") : t("splits.add-workout")
              }
            />
          ),
          headerBlurEffect: "none",
        }}
      />
      <ScreenContent
        scroll={false}
        edges={["top"]}
        HeaderComponent={
          <WorkoutFilter setFilteredTemplates={setFilteredTemplates} />
        }
        FooterComponent={
          <BottomAddWorkoutSection selectedTemplates={selected} />
        }
      >
        <AddSplitWorkoutList
          filteredTemplates={filteredTemplates}
          selectedTemplates={selected}
          setSelectedTemplates={setSelected}
          maxSelection={isSwapMode ? 1 : undefined}
          swapTemplate={swapTemplate}
        />
      </ScreenContent>
    </Fragment>
  );
}
