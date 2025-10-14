import { useRouter } from "expo-router";
import { useUIStore } from "../../stores/uiStore";

export function useStartWorkoutNavigation() {
 const { setWorkoutView } = useUIStore();
 const router = useRouter();

  return () => {
    router.back(); // Go back instead of navigating to "Home"
    setTimeout(() => {
      setWorkoutView(true);
    }, 100);
  };
}
