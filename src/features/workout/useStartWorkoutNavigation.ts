import { router } from "expo-router";
import { useUIStore } from "../../stores/uiStore";
import { useWorkoutStore } from "../../stores/workout";

export function useStartWorkoutNavigation() {
  const { setTypeOfView } = useUIStore();
  const { startSession } = useWorkoutStore();

  return () => {
    startSession();

    setTimeout(() => {
      router.back(); // Go back instead of navigating to "Home"
    }, 20);

    setTimeout(() => {
      setTypeOfView("workout");
    }, 180);
  };
}

export function useWorkoutNavigation() {
  const { setTypeOfView } = useUIStore();

  return () => {
    setTimeout(() => {
      router.back(); // Go back instead of navigating to "Home"
    }, 20);

    setTimeout(() => {
      setTypeOfView("workout");
    }, 180);
  };
}
