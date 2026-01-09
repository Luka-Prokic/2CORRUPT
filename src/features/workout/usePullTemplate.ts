import { useCallback } from "react";
import { useWorkoutStore, WorkoutSession } from "../../stores/workout";

export function usePullTemplate() {
  const { editTemplate, updateTemplateField, confirmTemplate } =
    useWorkoutStore();

  return useCallback((session: WorkoutSession) => {
    const templateId = editTemplate();

    const newLayout = session.layout.map((ex) => ({
      ...ex,
      sets: ex.sets.map((set) => ({
        ...set,
        isCompleted: false,
      })),
    }));

    updateTemplateField(templateId, "layout", newLayout);
    updateTemplateField(templateId, "name", session.name);
    updateTemplateField(templateId, "description", session.notes);

    confirmTemplate();
  }, []);
}
