import { router } from "expo-router";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";

export function useEditTemplate(templateId?: string) {
  const { editTemplate } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  return () => {
    setTimeout(() => {
      router.dismissTo("/");
    }, 100);
    editTemplate(templateId);
    setTypeOfView("template");
  };
}
