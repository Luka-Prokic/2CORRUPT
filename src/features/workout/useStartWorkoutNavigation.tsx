
import { useNavigation } from "@react-navigation/native";
import { useUIStore } from "../../stores/uiStore";

export function useStartWorkoutNavigation() {
  const navigation = useNavigation();
  const { setWorkoutView } = useUIStore();

  return () => {
    navigation.goBack(); // Go back instead of navigating to "Home"
    setTimeout(() => {
      setWorkoutView(true);
    }, 100);
  };
}
