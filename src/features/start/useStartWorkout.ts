import { useUIStore } from "../../stores/uiStore";
import { useWorkoutStore } from "../../stores/workout";
import { router } from "expo-router";

export function useStartWorkoutOfTemplate(templateId: string) {
  const { getTemplateById, startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const template = getTemplateById(templateId);
  if (!template) return;
  startSession(template);
  setTypeOfView("workout");
  router.dismissTo("/");
  return template;
}

export function useStartWorkoutOfSession(sessionId: string) {
  const { getSessionById, startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const session = getSessionById(sessionId);
  if (!session) return;
  startSession(null, session);
  setTypeOfView("workout");
  router.dismissTo("/");
  return session;
}
