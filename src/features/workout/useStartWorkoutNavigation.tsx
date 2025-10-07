import { router } from "expo-router";
import { useUIStore } from "../../stores/uiStore";

export function useStartWorkoutNavigation() {
 const { setWorkoutView } = useUIStore();

  return () => {
    router.back(); // Go back instead of navigating to "Home"
    setTimeout(() => {
      setWorkoutView(true);
    }, 100);
  };
}
