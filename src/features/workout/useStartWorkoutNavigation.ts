import { router } from "expo-router";
import { useUIStore } from "../../stores/uiStore";

export function useStartWorkoutNavigation() {
 const { setTypeOfView } = useUIStore();

  return () => {
    router.back(); // Go back instead of navigating to "Home"
    setTimeout(() => {
      setTypeOfView("workout");
    }, 100);
  };
}
