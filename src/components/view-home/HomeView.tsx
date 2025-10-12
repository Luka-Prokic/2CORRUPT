import { StartWorkoutButton } from "./StartWorkoutButton";
import { GreetingText } from "./GreetingText";
import { UIView } from "../ui/UIView";

export function HomeView() {
  return (
    <UIView type="home">
      <GreetingText />

      <StartWorkoutButton />
    </UIView>
  );
}
