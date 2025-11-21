import { useMemo } from "react";
import { SplitPlan } from "../../stores/workout/types";
import { WorkoutTemplate } from "../../stores/workout/types";

export const findTemplteOutOfWorkoutId = (
  workoutId: string,
  splitPlans: SplitPlan[],
  templates: WorkoutTemplate[]
) =>
  useMemo(() => {
    const templateId = splitPlans
      .find((p) =>
        p.split.find((d) => d.workouts.find((w) => w.id === workoutId))
      )
      ?.split.find((d) => d.workouts.find((w) => w.id === workoutId))
      ?.workouts.find((w) => w.id === workoutId)?.templateId;
    return templateId ? templates.find((t) => t.id === templateId) : null;
  }, [workoutId, splitPlans, templates]);
