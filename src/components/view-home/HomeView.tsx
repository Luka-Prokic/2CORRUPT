import { StartWorkoutButton } from "./StartWorkoutButton";
import { HomeHeader } from "./HomeHeader";
import { UIView } from "../ui/UIView";

export function HomeView() {
  return (
    <UIView type="home">
      <HomeHeader />

      <StartWorkoutButton />
    </UIView>
  );
}
