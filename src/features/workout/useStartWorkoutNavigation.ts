import { router } from "expo-router";
import { useUIStore } from "../../stores/uiStore";
import { useWorkoutStore } from "../../stores/workout";

export function useStartWorkoutNavigation() {
  const { setTypeOfView } = useUIStore();
  const { startSession } = useWorkoutStore();

  return () => {
    startSession();
    router.back(); // Go back instead of navigating to "Home"

    setTimeout(() => {
      setTypeOfView("workout");
    }, 100);
  };
}

export function useWorkoutNavigation() {
  const { setTypeOfView } = useUIStore();

  return () => {
    router.back(); // Go back instead of navigating to "Home"

    setTimeout(() => {
      setTypeOfView("workout");
    }, 100);
  };
}
